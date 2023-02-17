// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "openzeppelin-contracts/access/Ownable.sol";
import "unlock/contracts/interfaces/hooks/ILockKeyPurchasehook.sol";
import "unlock/contracts/interfaces/hooks/ILockValidKeyHook.sol";
import "unlock/contracts/interfaces/IPublicLock.sol";
import "./cabin-token/ICabinToken.sol";

// TODO: Later - Remove
import "forge-std/console.sol";

contract CabinUnlockHooks is Ownable, ILockKeyPurchaseHook, ILockValidKeyHook {
    error NoVoucher();
    error EmptyBytesArray();

    ICabinToken public cabinToken;
    IPublicLock public lock;

    uint256 public cabinTokensRequiredForDiscount = 1000 * 1 ether;

    // TODO: Confirm this default amount
    uint256 public cabinTokenPurchaseBonus = 100 * 1 ether;

    constructor(address cabinTokenAddress_, address lockAddress_) {
        cabinToken = ICabinToken(cabinTokenAddress_);
        lock = IPublicLock(lockAddress_);
    }

    function setCabinTokensRequiredForDiscount(uint256 cabinTokensRequiredForDiscount_) external onlyOwner {
        cabinTokensRequiredForDiscount = cabinTokensRequiredForDiscount_;
    }

    // ILockKeyPurchaseHook

    function keyPurchasePrice(address, address recipient, address, bytes calldata)
        external
        view
        returns (uint256 minKeyPrice)
    {
        if (cabinToken.balanceOf(recipient) >= cabinTokensRequiredForDiscount) {
            return 0;
        }

        return lock.keyPrice();
    }

    function onKeyPurchase(
        uint256, //tokenId
        address, // from
        address recipient,
        address, // referrer
        bytes calldata data,
        uint256 minKeyPrice,
        uint256 // pricePaid
    ) external {
        if (data.length == 0) {
            revert EmptyBytesArray();
        }

        (bool hasVoucher) = abi.decode(data, (bool));
        if (!hasVoucher) {
            revert NoVoucher();
        }

        // TODO: Maybe check that this equals the `PublicLock` `keyPrice`?
        if (minKeyPrice > 0 && cabinToken.balanceOf(address(this)) >= cabinTokenPurchaseBonus) {
            cabinToken.transfer(recipient, cabinTokenPurchaseBonus);
        }
    }

    // ILockValidKeyHook

    function hasValidKey(
        address, //lockAddress
        address keyOwner,
        uint256, // expirationTimestamp
        bool isValidKey
    ) external view returns (bool) {
        if (isValidKey) {
            return true;
        }

        // TODO: Determine if we want to invalidate the key immediately or only after it expires.
        // TODO: What if they previously paid but now have enough CABIN, does it stay valid forever?
        // TODO: `keyOwner` - who is this if they key was granted/gifted by someone else?

        // If we check `balanceOf` here:
        //  those who received a free membership from >= 1000 CABIN will have invalid tokens after the expiration period passes
        return lock.totalKeys(keyOwner) > 0 && cabinToken.balanceOf(keyOwner) >= cabinTokensRequiredForDiscount;
    }
}
