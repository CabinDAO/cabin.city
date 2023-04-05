// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "forge-std/console.sol";
import "forge-std/Vm.sol";
import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";

contract Signer {
    using ECDSA for bytes32;

    address public signerAddress;
    uint256 signerPrivateKey;

    Vm internal vm;

    constructor(Vm _vm, address _signerAddress, uint256 _signerPrivateKey) {
        vm = _vm;
        signerAddress = _signerAddress;
        signerPrivateKey = _signerPrivateKey;
    }

    function sign(bytes32 digest) public view returns (bytes memory) {
        bytes32 signatureDigest = digest.toEthSignedMessageHash();

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, signatureDigest);

        require(ecrecover(signatureDigest, v, r, s) == signerAddress, "Invalid signature");

        return abi.encodePacked(r, s, v);
    }
}
