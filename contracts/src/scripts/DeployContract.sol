// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "contracts/src/Contract.sol";

// A script that deploys contracts and establishes relationships between them.
contract DeployContract is Script {
    function deploy() external {
        vm.startBroadcast();

        new Contract();

        vm.stopBroadcast();
    }
}
