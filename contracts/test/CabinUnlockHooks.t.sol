// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/CabinUnlockHooks.sol";
import "../src/cabin-token/MockCabinToken.sol";
import "./support/MockPublicLock.sol";
import "./support/Signer.sol";

contract CabinUnlockHooksTest is Test {
    address OWNER = makeAddr("owner");
    uint256 SIGNER_PRIVATE_KEY = 0xB0B;
    address SIGNER_ADDRESS;
    uint256 FAKE_SIGNER_PRIVATE_KEY = 0xB0C;
    address FAKE_SIGNER_ADDRESS;

    Signer _signer;
    Signer _fakeSigner;
    CabinUnlockHooks _hooks;
    MockPublicLock _lock;

    function setUp() public {
        vm.chainId(11155111); // Sepolia
        SIGNER_ADDRESS = vm.addr(SIGNER_PRIVATE_KEY);
        _signer = new Signer(vm, SIGNER_ADDRESS, SIGNER_PRIVATE_KEY);

        FAKE_SIGNER_ADDRESS = vm.addr(FAKE_SIGNER_PRIVATE_KEY);
        _fakeSigner = new Signer(vm, FAKE_SIGNER_ADDRESS, FAKE_SIGNER_PRIVATE_KEY);

        vm.prank(OWNER);
        _lock = new MockPublicLock();

        vm.prank(OWNER);
        _hooks = new CabinUnlockHooks(address(_lock), SIGNER_ADDRESS);
    }

    function _buildData(address recipient, bool hasVoucher, uint256 cabinBalance)
        internal
        view
        returns (bytes memory)
    {
        return _buildDataWithSigner(recipient, hasVoucher, cabinBalance, _signer);
    }

    function _buildDataWithSigner(address recipient, bool hasVoucher, uint256 cabinBalance, Signer signer)
        internal
        view
        returns (bytes memory)
    {
        bytes memory payload = abi.encode(hasVoucher, cabinBalance);
        bytes memory digest = abi.encode("CabinUnlockData", recipient, block.chainid);
        bytes32 hashed = keccak256(digest);

        bytes memory signature = signer.sign(hashed);

        return abi.encode(payload, signature);
    }

    function testDefaults() public {
        assertEq(_hooks.cabinTokensRequiredForDiscount(), 1000 * 1 ether);
    }

    function testKeyPurchasePriceDefault() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");
        uint256 price = _hooks.keyPurchasePrice(from, recipient, referrer, _buildData(recipient, true, 0));
        assertEq(price, 209_000000);
    }

    function testKeyPurchasePriceRecipientHolds1000CabinTokens() public {
        address from = makeAddr("from");
        // address recipient = makeAddr("recipient");
        address recipient = 0x5685f4d3d59Ef81beEac49f80B785290F9F2ec5c;
        address referrer = makeAddr("referrer");

        bool hasVoucher = true;
        uint256 cabinBalance = 1000 * 1 ether;
        bytes memory data = _buildData(recipient, hasVoucher, cabinBalance);
        console.log("data:");
        console.logBytes(data);

        uint256 price = _hooks.keyPurchasePrice(from, recipient, referrer, data);
        assertEq(price, 0);
    }

    function testKeyPurchasePriceRecipientDoesNotMatchSignatureRecipientReverts() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address otherRecipient = makeAddr("otherRecipient");
        address referrer = makeAddr("referrer");

        bool hasVoucher = true;
        uint256 cabinBalance = 1000 * 1 ether;
        bytes memory data = _buildData(otherRecipient, hasVoucher, cabinBalance);

        vm.expectRevert(CabinUnlockHooks.InvalidSignature.selector);
        _hooks.keyPurchasePrice(from, recipient, referrer, data);
    }

    function testKeyPurchasePriceRecipientSignedByFakeSignerReverts() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        bool hasVoucher = true;
        uint256 cabinBalance = 1000 * 1 ether;
        bytes memory data = _buildDataWithSigner(recipient, hasVoucher, cabinBalance, _fakeSigner);

        vm.expectRevert(CabinUnlockHooks.InvalidSignature.selector);
        _hooks.keyPurchasePrice(from, recipient, referrer, data);
    }

    function testKeyPurchasePriceRecipientHolds999CabinTokens() public {
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        bool hasVoucher = true;
        uint256 cabinBalance = 999 * 1 ether;
        bytes memory data = _buildData(recipient, hasVoucher, cabinBalance);

        uint256 price = _hooks.keyPurchasePrice(from, recipient, referrer, data);
        assertEq(price, 209_000000);
    }

    function testOnKeyPurchaseContractWithVoucher() public {
        bool hasVoucher = true;
        uint256 cabinBalance = 0;
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        bytes memory data = _buildData(recipient, hasVoucher, cabinBalance);

        uint256 tokenId = 1;
        uint256 minKeyPrice = 209_000000;
        uint256 pricePaid = minKeyPrice;

        _hooks.onKeyPurchase(tokenId, from, recipient, referrer, data, minKeyPrice, pricePaid);
    }

    function testOnKeyPurchaseContractNoVoucherReverts() public {
        bool hasVoucher = false;
        uint256 cabinBalance = 0;
        address from = makeAddr("from");
        address recipient = makeAddr("recipient");
        address referrer = makeAddr("referrer");

        bytes memory data = _buildData(recipient, hasVoucher, cabinBalance);

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

    function testSetCabinTokensRequiredForDiscountNotOwnerReverts() public {
        uint256 newCabinTokensRequiredForDiscount = 2000 * 1 ether;

        vm.prank(makeAddr("notOwner"));
        vm.expectRevert("Ownable: caller is not the owner");
        _hooks.setCabinTokensRequiredForDiscount(newCabinTokensRequiredForDiscount);
    }

    function testSetCabinTokensRequiredForDiscount() public {
        uint256 newCabinTokensRequiredForDiscount = 2000 * 1 ether;

        vm.prank(OWNER);
        _hooks.setCabinTokensRequiredForDiscount(newCabinTokensRequiredForDiscount);

        assertEq(_hooks.cabinTokensRequiredForDiscount(), newCabinTokensRequiredForDiscount);
    }

    function testSetSignerAddress() public {
        address newSignerAddress = makeAddr("newSigner");

        vm.prank(OWNER);
        _hooks.setSignerAddress(newSignerAddress);

        assertEq(_hooks.signerAddress(), newSignerAddress);
    }

    function testSetSignerAddressNotOwnerReverts() public {
        address newSignerAddress = makeAddr("newSigner");

        vm.prank(makeAddr("notOwner"));
        vm.expectRevert("Ownable: caller is not the owner");
        _hooks.setSignerAddress(newSignerAddress);
    }
}
