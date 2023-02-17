// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/CabinUnlockHooks.sol";
import "../src/cabin-token/MockCabinToken.sol";
import "./support/MockPublicLock.sol";

contract CabinUnlockHooksTest is Test {
    address OWNER = makeAddr("owner");
    CabinUnlockHooks _hooks;
    ICabinToken _cabinToken;
    MockPublicLock _lock;

    function setUp() public {
        _cabinToken = new MockCabinToken(OWNER);

        _lock = new MockPublicLock();
        _hooks = new CabinUnlockHooks(address(_cabinToken), address(_lock));
    }

    function testDefaults() public {
        assertEq(_hooks.cabinTokensRequiredForDiscount(), 1000 * 1 ether);
    }

    function testKeyPurchasePriceDefault() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");
        uint256 price = _hooks.keyPurchasePrice(from, recipient, referrer, new bytes(0));
        assertEq(price, 209_000000);
    }

    function testKeyPurchasePriceRecipientHolds1000CabinTokens() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        vm.prank(OWNER);
        _cabinToken.transfer(recipient, 1000 * 1 ether);

        uint256 price = _hooks.keyPurchasePrice(from, recipient, referrer, new bytes(0));
        assertEq(price, 0);
    }

    function testOnKeyPurchaseRecipientHoldsZeroCabinIsGrantedCabinTokens() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        uint256 tokenId = 1;
        uint256 minKeyPrice = 209_000000;
        uint256 pricePaid = minKeyPrice;

        // Ensure contract has enough cabin tokens
        vm.prank(OWNER);
        _cabinToken.transfer(address(_hooks), 100 * 1 ether);

        bool hasVoucher = true;
        bytes memory data = abi.encode(hasVoucher);

        _hooks.onKeyPurchase(tokenId, from, recipient, referrer, data, minKeyPrice, pricePaid);

        assertEq(_cabinToken.balanceOf(recipient), 100 * 1 ether);
    }

    function testOnKeyPurchaseContractHasNoFunds() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        uint256 tokenId = 1;
        uint256 minKeyPrice = 209_000000;
        uint256 pricePaid = minKeyPrice;

        bool hasVoucher = true;
        bytes memory data = abi.encode(hasVoucher);

        _hooks.onKeyPurchase(tokenId, from, recipient, referrer, data, minKeyPrice, pricePaid);

        assertEq(_cabinToken.balanceOf(recipient), 0);
    }

    function testOnKeyPurchaseContractWithVoucher() public {
        bool hasVoucher = true;
        bytes memory data = abi.encode(hasVoucher);

        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        uint256 tokenId = 1;
        uint256 minKeyPrice = 209_000000;
        uint256 pricePaid = minKeyPrice;

        _hooks.onKeyPurchase(tokenId, from, recipient, referrer, data, minKeyPrice, pricePaid);
    }

    function testOnKeyPurchaseContractNoVoucherReverts() public {
        bool hasVoucher = false;
        bytes memory data = abi.encode(hasVoucher);

        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        uint256 tokenId = 1;
        uint256 minKeyPrice = 209_000000;
        uint256 pricePaid = minKeyPrice;

        vm.expectRevert(CabinUnlockHooks.NoVoucher.selector);
        _hooks.onKeyPurchase(tokenId, from, recipient, referrer, data, minKeyPrice, pricePaid);
    }

    function testOnKeyPurchaseContractEmptyDataReverts() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        uint256 tokenId = 1;
        uint256 minKeyPrice = 209_000000;
        uint256 pricePaid = minKeyPrice;
        bytes memory emptyData;

        vm.expectRevert(CabinUnlockHooks.EmptyBytesArray.selector);
        _hooks.onKeyPurchase(tokenId, from, recipient, referrer, emptyData, minKeyPrice, pricePaid);
    }

    function testHasValidKeyIsValidKeyIsFalseReturnsFalse() public {
        address lockAddress = makeAddr("lockAddress");
        address keyOwner = makeAddr("keyOwner");
        uint256 expirationTimestamp = 0;
        bool isValidKey = false;

        bool hasValidKey = _hooks.hasValidKey(lockAddress, keyOwner, expirationTimestamp, isValidKey);

        assertEq(hasValidKey, false);
    }

    function testHasValidKeyIsValidKeyIsTrueReturnsTrue() public {
        address lockAddress = makeAddr("lockAddress");
        address keyOwner = makeAddr("keyOwner");
        uint256 expirationTimestamp = 0;
        bool isValidKey = true;

        bool hasValidKey = _hooks.hasValidKey(lockAddress, keyOwner, expirationTimestamp, isValidKey);

        assertEq(hasValidKey, true);
    }

    function testHasValidKeyHas1000CabinTokensButZeroKeys() public {
        address lockAddress = makeAddr("lockAddress");
        address keyOwner = makeAddr("keyOwner");
        uint256 expirationTimestamp = 0;
        bool isValidKey = false;

        vm.prank(OWNER);
        _cabinToken.transfer(keyOwner, 1000 * 1 ether);

        bool hasValidKey = _hooks.hasValidKey(lockAddress, keyOwner, expirationTimestamp, isValidKey);

        // The hook contract will pass isValidKey as false
        // The keyOwner also will not have a balance (no token/key purchased)
        // So the key is not valid
        assertEq(hasValidKey, false);
    }

    function testHasValidKeyHas1000CabinTokensAndOneExpiredKey() public {
        address lockAddress = makeAddr("lockAddress");
        address keyOwner = makeAddr("keyOwner");
        uint256 expirationTimestamp = 0;
        bool isValidKey = false;

        vm.prank(OWNER);
        _cabinToken.transfer(keyOwner, 1000 * 1 ether);

        _lock.setTotalKeys(keyOwner, 1);

        bool hasValidKey = _hooks.hasValidKey(lockAddress, keyOwner, expirationTimestamp, isValidKey);

        // The hook contract will pass isValidKey as false (expired)
        // The keyOwner also will have a key from a previous purchase
        // So the key is valid
        assertEq(hasValidKey, true);
    }
}
