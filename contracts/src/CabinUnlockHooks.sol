// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "./unlock/ILockKeyPurchaseHook.sol";
import "./unlock/IPublicLock.sol";

contract CabinUnlockHooks is Ownable, ILockKeyPurchaseHook {
    using ECDSA for bytes32;

    error NoVoucher();
    error EmptyBytesArray();
    error InvalidSignature();

    event SetCabinTokensRequiredForDiscount(uint256 amount);
    event SetSignerAddress(address signerAddress);

    IPublicLock public lock;
    address public signerAddress;

    uint256 public cabinTokensRequiredForDiscount = 1000 * 1 ether;

    constructor(address lockAddress_, address signerAddress_) {
        lock = IPublicLock(lockAddress_);
        signerAddress = signerAddress_;
    }

    function setCabinTokensRequiredForDiscount(uint256 cabinTokensRequiredForDiscount_) external onlyOwner {
        cabinTokensRequiredForDiscount = cabinTokensRequiredForDiscount_;
        emit SetCabinTokensRequiredForDiscount(cabinTokensRequiredForDiscount_);
    }

    function setSignerAddress(address signerAddress_) external onlyOwner {
        signerAddress = signerAddress_;
        emit SetSignerAddress(signerAddress_);
    }

    // ILockKeyPurchaseHook

    function keyPurchasePrice(address, address recipient, address, bytes calldata data)
        external
        view
        returns (uint256 minKeyPrice)
    {
        (bytes memory payload, bytes memory signature) = abi.decode(data, (bytes, bytes));

        if (!_verifySignature(keccak256(abi.encode("CabinUnlockData", recipient, block.chainid)), signature)) {
            revert InvalidSignature();
        }

        (, uint256 cabinBalance) = abi.decode(payload, (bool, uint256));

        if (cabinBalance >= cabinTokensRequiredForDiscount) {
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
        uint256, // minKeyPrice,
        uint256 // pricePaid
    ) external view {
        if (data.length == 0) {
            revert EmptyBytesArray();
        }

        (bytes memory payload, bytes memory signature) = abi.decode(data, (bytes, bytes));
        (bool hasVoucher,) = abi.decode(payload, (bool, uint256));
        _verifySignature(keccak256(abi.encode("CabinUnlockData", recipient, block.chainid)), signature);

        if (!hasVoucher) {
            revert NoVoucher();
        }
    }

    function _verifySignature(bytes32 hash, bytes memory signature) internal view returns (bool) {
        bytes32 signedHash = hash.toEthSignedMessageHash();
        (address signedHashAddress, ECDSA.RecoverError error) = signedHash.tryRecover(signature);

        if (error == ECDSA.RecoverError.NoError) {
            return signedHashAddress == signerAddress;
        } else {
            return false;
        }
    }
}
