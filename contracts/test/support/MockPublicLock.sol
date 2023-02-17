// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

// unlock/contracts/interfaces/IPublicLock.sol
contract MockPublicLock {
    uint256 public keyPrice = 209_000000;

    // In the real contract, balance represents _valid_ keys
    mapping(address => uint256) _balances;

    // In the real contract, totalKeys represents _all_ keys, regardless of validity/expiration
    mapping(address => uint256) _totalKeys;

    function setKeyPrice(uint256 keyPrice_) external {
        keyPrice = keyPrice_;
    }

    function balanceOf(address owner) external view returns (uint256) {
        return _balances[owner];
    }

    function setBalanceOf(address owner, uint256 balance) external {
        _balances[owner] = balance;
    }

    function totalKeys(address keyOwner) external view returns (uint256 numberOfKeys) {
        return _totalKeys[keyOwner];
    }

    function setTotalKeys(address keyOwner, uint256 numberOfKeys) external {
        _totalKeys[keyOwner] = numberOfKeys;
    }
}
