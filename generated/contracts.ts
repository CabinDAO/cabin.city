import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from '@wagmi/core/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Citizenship Contract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const citizenshipContractAbi = [
  { type: 'error', inputs: [], name: 'CANNOT_APPROVE_SELF' },
  { type: 'error', inputs: [], name: 'CANT_BE_SMALLER_THAN_SUPPLY' },
  { type: 'error', inputs: [], name: 'CANT_EXTEND_NON_EXPIRING_KEY' },
  { type: 'error', inputs: [], name: 'GAS_REFUND_FAILED' },
  { type: 'error', inputs: [], name: 'INSUFFICIENT_ERC20_VALUE' },
  { type: 'error', inputs: [], name: 'INSUFFICIENT_VALUE' },
  { type: 'error', inputs: [], name: 'INVALID_ADDRESS' },
  {
    type: 'error',
    inputs: [{ name: 'hookIndex', internalType: 'uint8', type: 'uint8' }],
    name: 'INVALID_HOOK',
  },
  { type: 'error', inputs: [], name: 'INVALID_LENGTH' },
  { type: 'error', inputs: [], name: 'INVALID_TOKEN' },
  { type: 'error', inputs: [], name: 'KEY_NOT_VALID' },
  { type: 'error', inputs: [], name: 'KEY_TRANSFERS_DISABLED' },
  { type: 'error', inputs: [], name: 'LOCK_HAS_CHANGED' },
  { type: 'error', inputs: [], name: 'LOCK_SOLD_OUT' },
  { type: 'error', inputs: [], name: 'MAX_KEYS_REACHED' },
  { type: 'error', inputs: [], name: 'MIGRATION_REQUIRED' },
  { type: 'error', inputs: [], name: 'NON_COMPLIANT_ERC721_RECEIVER' },
  { type: 'error', inputs: [], name: 'NON_RENEWABLE_LOCK' },
  { type: 'error', inputs: [], name: 'NOT_ENOUGH_FUNDS' },
  { type: 'error', inputs: [], name: 'NOT_ENOUGH_TIME' },
  { type: 'error', inputs: [], name: 'NOT_READY_FOR_RENEWAL' },
  { type: 'error', inputs: [], name: 'NO_SUCH_KEY' },
  { type: 'error', inputs: [], name: 'NULL_VALUE' },
  { type: 'error', inputs: [], name: 'ONLY_KEY_MANAGER_OR_APPROVED' },
  { type: 'error', inputs: [], name: 'ONLY_LOCK_MANAGER' },
  { type: 'error', inputs: [], name: 'ONLY_LOCK_MANAGER_OR_KEY_GRANTER' },
  { type: 'error', inputs: [], name: 'OUT_OF_RANGE' },
  { type: 'error', inputs: [], name: 'OWNER_CANT_BE_ADDRESS_ZERO' },
  { type: 'error', inputs: [], name: 'SCHEMA_VERSION_NOT_CORRECT' },
  { type: 'error', inputs: [], name: 'TRANSFER_TO_SELF' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED' },
  { type: 'error', inputs: [], name: 'UNAUTHORIZED_KEY_MANAGER_UPDATE' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sendTo',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'refund',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CancelKey',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newExpiration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'timeAdded', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ExpirationChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ExpireKey',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'refundedAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GasRefunded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'newTimestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'KeyExtended',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'KeyGranterAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'KeyGranterRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: '_newManager',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'KeyManagerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'updatedRecordsCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'KeysMigrated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'expirationDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'maxNumberOfKeys',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'maxKeysPerAcccount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LockConfig',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'LockManagerAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'LockManagerRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'baseTokenURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'LockMetadata',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldKeyPrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'keyPrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'oldTokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PricingChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'freeTrialLength',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundPenaltyBasisPoints',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RefundPenaltyChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'transferFeeBasisPoints',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferFeeChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'unlockAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UnlockCallFailed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'KEY_GRANTER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'LOCK_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'addKeyGranter',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'addLockManager',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_approved', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_keyOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelAndRefund',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'expirationDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'expireAndRefundFor',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_value', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_referrer', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extend',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'freeTrialLength',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gasRefundValue',
    outputs: [
      { name: '_refundValue', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getCancelAndRefundValue',
    outputs: [{ name: 'refund', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_keyOwner', internalType: 'address', type: 'address' }],
    name: 'getHasValidKey',
    outputs: [{ name: 'isValid', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_time', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTransferFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_duration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantKeyExtension',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_recipients', internalType: 'address[]', type: 'address[]' },
      {
        name: '_expirationTimestamps',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: '_keyManagers', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'grantKeys',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_lockCreator',
        internalType: 'address payable',
        type: 'address',
      },
      { name: '_expirationDuration', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_keyPrice', internalType: 'uint256', type: 'uint256' },
      { name: '_maxNumberOfKeys', internalType: 'uint256', type: 'uint256' },
      { name: '_lockName', internalType: 'string', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isKeyGranter',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isLockManager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'isValidKey',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'keyExpirationTimestampFor',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'keyManagerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'keyPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lendKey',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxKeysPerAddress',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxNumberOfKeys',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenIdFrom', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenIdTo', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mergeKeys',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    name: 'migrate',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'numberOfOwners',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'onKeyCancelHook',
    outputs: [
      {
        name: '',
        internalType: 'contract ILockKeyCancelHook',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'onKeyExtendHook',
    outputs: [
      {
        name: '',
        internalType: 'contract ILockKeyExtendHook',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'onKeyGrantHook',
    outputs: [
      { name: '', internalType: 'contract ILockKeyGrantHook', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'onKeyPurchaseHook',
    outputs: [
      {
        name: '',
        internalType: 'contract ILockKeyPurchaseHook',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'onKeyTransferHook',
    outputs: [
      {
        name: '',
        internalType: 'contract ILockKeyTransferHook',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'onTokenURIHook',
    outputs: [
      { name: '', internalType: 'contract ILockTokenURIHook', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'onValidKeyHook',
    outputs: [
      { name: '', internalType: 'contract ILockValidKeyHook', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'publicLockVersion',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_recipients', internalType: 'address[]', type: 'address[]' },
      { name: '_referrers', internalType: 'address[]', type: 'address[]' },
      { name: '_keyManagers', internalType: 'address[]', type: 'address[]' },
      { name: '_data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'purchase',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_referrer', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'purchasePriceFor',
    outputs: [
      { name: 'minKeyPrice', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'referrerFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'refundPenaltyBasisPoints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_referrer', internalType: 'address', type: 'address' },
    ],
    name: 'renewMembershipFor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceLockManager',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_granter', internalType: 'address', type: 'address' }],
    name: 'revokeKeyGranter',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'schemaVersion',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_onKeyPurchaseHook', internalType: 'address', type: 'address' },
      { name: '_onKeyCancelHook', internalType: 'address', type: 'address' },
      { name: '_onValidKeyHook', internalType: 'address', type: 'address' },
      { name: '_onTokenURIHook', internalType: 'address', type: 'address' },
      { name: '_onKeyTransferHook', internalType: 'address', type: 'address' },
      { name: '_onKeyExtendHook', internalType: 'address', type: 'address' },
      { name: '_onKeyGrantHook', internalType: 'address', type: 'address' },
    ],
    name: 'setEventHooks',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_refundValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setGasRefundValue',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_keyManager', internalType: 'address', type: 'address' },
    ],
    name: 'setKeyManagerOf',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_lockName', internalType: 'string', type: 'string' },
      { name: '_lockSymbol', internalType: 'string', type: 'string' },
      { name: '_baseTokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'setLockMetadata',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_referrer', internalType: 'address', type: 'address' },
      { name: '_feeBasisPoint', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setReferrerFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenIdFrom', internalType: 'uint256', type: 'uint256' },
      { name: '_timeShared', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'shareKey',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_keyOwner', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_keyOwner', internalType: 'address', type: 'address' }],
    name: 'totalKeys',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_valueBasisPoint', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'transferFeeBasisPoints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unlendKey',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'unlockProtocol',
    outputs: [{ name: '', internalType: 'contract IUnlock', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_keyPrice', internalType: 'uint256', type: 'uint256' },
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'updateKeyPricing',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_newExpirationDuration',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_maxNumberOfKeys', internalType: 'uint256', type: 'uint256' },
      { name: '_maxKeysPerAcccount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateLockConfig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_freeTrialLength', internalType: 'uint256', type: 'uint256' },
      {
        name: '_refundPenaltyBasisPoints',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'updateRefundPenalty',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'updateSchemaVersion',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_transferFeeBasisPoints',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'updateTransferFee',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_tokenAddress', internalType: 'address', type: 'address' },
      { name: '_recipient', internalType: 'address payable', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const citizenshipContractAddress = {
  10: '0x45aCCac0E5C953009cDa713a3b722F87F2907F86',
  11155111: '0xdbdd8B233Bed095DB975f2cd527a714c5FC7Db62',
} as const

/**
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const citizenshipContractConfig = {
  address: citizenshipContractAddress,
  abi: citizenshipContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token Contract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const tokenContractAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: 'owner_', internalType: 'address', type: 'address' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipTransfer',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isNextOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner_', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'nextOwner_', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const tokenContractAddress = {
  1: '0x1934E252f840aA98dfCe2b6205B3E45c41AeF830',
  11155111: '0x331E823689314B702396b97FF299D9D2968EFf47',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const tokenContractConfig = {
  address: tokenContractAddress,
  abi: tokenContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContract = /*#__PURE__*/ createUseReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"KEY_GRANTER_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractKeyGranterRole =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'KEY_GRANTER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"LOCK_MANAGER_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractLockManagerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'LOCK_MANAGER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"expirationDuration"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractExpirationDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'expirationDuration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"freeTrialLength"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractFreeTrialLength =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'freeTrialLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"gasRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractGasRefundValue =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'gasRefundValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getCancelAndRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractGetCancelAndRefundValue =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getCancelAndRefundValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getHasValidKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractGetHasValidKey =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getHasValidKey',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getTransferFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractGetTransferFee =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getTransferFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractIsKeyGranter =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isKeyGranter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractIsLockManager =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isLockManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isOwner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractIsOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isValidKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractIsValidKey =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isValidKey',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"keyExpirationTimestampFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractKeyExpirationTimestampFor =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'keyExpirationTimestampFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"keyManagerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractKeyManagerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'keyManagerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"keyPrice"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractKeyPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'keyPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"maxKeysPerAddress"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractMaxKeysPerAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'maxKeysPerAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"maxNumberOfKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractMaxNumberOfKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'maxNumberOfKeys',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractName =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'name',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"numberOfOwners"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractNumberOfOwners =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'numberOfOwners',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyCancelHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOnKeyCancelHook =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyCancelHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyExtendHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOnKeyExtendHook =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyExtendHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyGrantHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOnKeyGrantHook =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyGrantHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyPurchaseHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOnKeyPurchaseHook =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyPurchaseHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyTransferHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOnKeyTransferHook =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyTransferHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onTokenURIHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOnTokenUriHook =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onTokenURIHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onValidKeyHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOnValidKeyHook =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onValidKeyHook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"publicLockVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractPublicLockVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'publicLockVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"purchasePriceFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractPurchasePriceFor =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'purchasePriceFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"referrerFees"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractReferrerFees =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'referrerFees',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"refundPenaltyBasisPoints"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractRefundPenaltyBasisPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'refundPenaltyBasisPoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"schemaVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractSchemaVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'schemaVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'symbol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenAddress"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractTokenAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"totalKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractTotalKeys =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'totalKeys',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transferFeeBasisPoints"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractTransferFeeBasisPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transferFeeBasisPoints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"unlockProtocol"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useReadCitizenshipContractUnlockProtocol =
  /*#__PURE__*/ createUseReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'unlockProtocol',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContract = /*#__PURE__*/ createUseWriteContract(
  { abi: citizenshipContractAbi, address: citizenshipContractAddress },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractAddKeyGranter =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addKeyGranter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractAddLockManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addLockManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"cancelAndRefund"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractCancelAndRefund =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'cancelAndRefund',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"expireAndRefundFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractExpireAndRefundFor =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'expireAndRefundFor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"extend"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractExtend =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'extend',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeyExtension"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractGrantKeyExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeyExtension',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractGrantKeys =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeys',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"lendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractLendKey =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'lendKey',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"mergeKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractMergeKeys =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'mergeKeys',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"migrate"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractMigrate =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'migrate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"purchase"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractPurchase =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'purchase',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renewMembershipFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractRenewMembershipFor =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renewMembershipFor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractRenounceLockManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceLockManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractRevokeKeyGranter =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeKeyGranter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setEventHooks"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSetEventHooks =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setEventHooks',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setGasRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSetGasRefundValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setGasRefundValue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setKeyManagerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSetKeyManagerOf =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setKeyManagerOf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setLockMetadata"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSetLockMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setLockMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setOwner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSetOwner =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setOwner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setReferrerFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractSetReferrerFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setReferrerFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"shareKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractShareKey =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'shareKey',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"unlendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractUnlendKey =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'unlendKey',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateKeyPricing"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractUpdateKeyPricing =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateKeyPricing',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateLockConfig"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractUpdateLockConfig =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateLockConfig',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateRefundPenalty"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractUpdateRefundPenalty =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateRefundPenalty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateSchemaVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractUpdateSchemaVersion =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateSchemaVersion',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateTransferFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractUpdateTransferFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateTransferFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWriteCitizenshipContractWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractAddKeyGranter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addKeyGranter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractAddLockManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addLockManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"cancelAndRefund"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractCancelAndRefund =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'cancelAndRefund',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"expireAndRefundFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractExpireAndRefundFor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'expireAndRefundFor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"extend"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractExtend =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'extend',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeyExtension"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractGrantKeyExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeyExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractGrantKeys =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeys',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"lendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractLendKey =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'lendKey',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"mergeKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractMergeKeys =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'mergeKeys',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"migrate"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractMigrate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'migrate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"purchase"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractPurchase =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'purchase',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renewMembershipFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractRenewMembershipFor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renewMembershipFor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractRenounceLockManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceLockManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractRevokeKeyGranter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeKeyGranter',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setEventHooks"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSetEventHooks =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setEventHooks',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setGasRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSetGasRefundValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setGasRefundValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setKeyManagerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSetKeyManagerOf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setKeyManagerOf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setLockMetadata"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSetLockMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setLockMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setOwner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSetOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setReferrerFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractSetReferrerFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setReferrerFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"shareKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractShareKey =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'shareKey',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"unlendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractUnlendKey =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'unlendKey',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateKeyPricing"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractUpdateKeyPricing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateKeyPricing',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateLockConfig"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractUpdateLockConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateLockConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateRefundPenalty"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractUpdateRefundPenalty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateRefundPenalty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateSchemaVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractUpdateSchemaVersion =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateSchemaVersion',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateTransferFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractUpdateTransferFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateTransferFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useSimulateCitizenshipContractWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"CancelKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractCancelKeyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'CancelKey',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"ExpirationChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractExpirationChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'ExpirationChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"ExpireKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractExpireKeyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'ExpireKey',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"GasRefunded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractGasRefundedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'GasRefunded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyExtended"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractKeyExtendedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyExtended',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyGranterAdded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractKeyGranterAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyGranterAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyGranterRemoved"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractKeyGranterRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyGranterRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyManagerChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractKeyManagerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyManagerChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeysMigrated"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractKeysMigratedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeysMigrated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockConfig"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractLockConfigEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockConfig',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockManagerAdded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractLockManagerAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockManagerAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockManagerRemoved"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractLockManagerRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockManagerRemoved',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockMetadata"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractLockMetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockMetadata',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"PricingChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractPricingChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'PricingChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RefundPenaltyChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractRefundPenaltyChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RefundPenaltyChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"TransferFeeChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractTransferFeeChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'TransferFeeChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"UnlockCallFailed"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractUnlockCallFailedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'UnlockCallFailed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Withdrawal"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const useWatchCitizenshipContractWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Withdrawal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContract = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractPermitTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'PERMIT_TYPEHASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractDecimals = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'decimals',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"isNextOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractIsNextOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'isNextOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"isOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractIsOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'isOwner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractName = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"nonces"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractNonces = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useReadTokenContractTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContract = /*#__PURE__*/ createUseWriteContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"cancelOwnershipTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractCancelOwnershipTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'cancelOwnershipTransfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractMint = /*#__PURE__*/ createUseWriteContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractPermit = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'permit',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWriteTokenContractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContract = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenContractAbi, address: tokenContractAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"cancelOwnershipTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractCancelOwnershipTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'cancelOwnershipTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useSimulateTokenContractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWatchTokenContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenContractAbi,
    address: tokenContractAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWatchTokenContractApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWatchTokenContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const useWatchTokenContractTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    eventName: 'Transfer',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContract = /*#__PURE__*/ createReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractDefaultAdminRole =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"KEY_GRANTER_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractKeyGranterRole =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'KEY_GRANTER_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"LOCK_MANAGER_ROLE"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractLockManagerRole =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'LOCK_MANAGER_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractBalanceOf =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"expirationDuration"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractExpirationDuration =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'expirationDuration',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"freeTrialLength"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractFreeTrialLength =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'freeTrialLength',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"gasRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractGasRefundValue =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'gasRefundValue',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractGetApproved =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getCancelAndRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractGetCancelAndRefundValue =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getCancelAndRefundValue',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getHasValidKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractGetHasValidKey =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getHasValidKey',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractGetRoleAdmin =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"getTransferFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractGetTransferFee =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'getTransferFee',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractHasRole = /*#__PURE__*/ createReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractIsApprovedForAll =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractIsKeyGranter =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isKeyGranter',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractIsLockManager =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isLockManager',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isOwner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractIsOwner = /*#__PURE__*/ createReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
  functionName: 'isOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"isValidKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractIsValidKey =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'isValidKey',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"keyExpirationTimestampFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractKeyExpirationTimestampFor =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'keyExpirationTimestampFor',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"keyManagerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractKeyManagerOf =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'keyManagerOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"keyPrice"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractKeyPrice = /*#__PURE__*/ createReadContract(
  {
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'keyPrice',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"maxKeysPerAddress"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractMaxKeysPerAddress =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'maxKeysPerAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"maxNumberOfKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractMaxNumberOfKeys =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'maxNumberOfKeys',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractName = /*#__PURE__*/ createReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"numberOfOwners"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractNumberOfOwners =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'numberOfOwners',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyCancelHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOnKeyCancelHook =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyCancelHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyExtendHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOnKeyExtendHook =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyExtendHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyGrantHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOnKeyGrantHook =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyGrantHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyPurchaseHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOnKeyPurchaseHook =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyPurchaseHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onKeyTransferHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOnKeyTransferHook =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onKeyTransferHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onTokenURIHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOnTokenUriHook =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onTokenURIHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"onValidKeyHook"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOnValidKeyHook =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'onValidKeyHook',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOwner = /*#__PURE__*/ createReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractOwnerOf = /*#__PURE__*/ createReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"publicLockVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractPublicLockVersion =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'publicLockVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"purchasePriceFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractPurchasePriceFor =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'purchasePriceFor',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"referrerFees"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractReferrerFees =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'referrerFees',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"refundPenaltyBasisPoints"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractRefundPenaltyBasisPoints =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'refundPenaltyBasisPoints',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"schemaVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractSchemaVersion =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'schemaVersion',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractSymbol = /*#__PURE__*/ createReadContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenAddress"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractTokenAddress =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenAddress',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractTokenByIndex =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractTokenOfOwnerByIndex =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractTokenUri = /*#__PURE__*/ createReadContract(
  {
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'tokenURI',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"totalKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractTotalKeys =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'totalKeys',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractTotalSupply =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transferFeeBasisPoints"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractTransferFeeBasisPoints =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transferFeeBasisPoints',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"unlockProtocol"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const readCitizenshipContractUnlockProtocol =
  /*#__PURE__*/ createReadContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'unlockProtocol',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContract = /*#__PURE__*/ createWriteContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractAddKeyGranter =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addKeyGranter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractAddLockManager =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addLockManager',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractApprove =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractBurn = /*#__PURE__*/ createWriteContract({
  abi: citizenshipContractAbi,
  address: citizenshipContractAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"cancelAndRefund"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractCancelAndRefund =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'cancelAndRefund',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"expireAndRefundFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractExpireAndRefundFor =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'expireAndRefundFor',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"extend"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractExtend = /*#__PURE__*/ createWriteContract(
  {
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'extend',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeyExtension"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractGrantKeyExtension =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeyExtension',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractGrantKeys =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeys',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractGrantRole =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractInitialize =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"lendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractLendKey =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'lendKey',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"mergeKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractMergeKeys =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'mergeKeys',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"migrate"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractMigrate =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'migrate',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"purchase"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractPurchase =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'purchase',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renewMembershipFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractRenewMembershipFor =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renewMembershipFor',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractRenounceLockManager =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceLockManager',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractRenounceRole =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractRevokeKeyGranter =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeKeyGranter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractRevokeRole =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSafeTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSetApprovalForAll =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setEventHooks"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSetEventHooks =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setEventHooks',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setGasRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSetGasRefundValue =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setGasRefundValue',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setKeyManagerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSetKeyManagerOf =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setKeyManagerOf',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setLockMetadata"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSetLockMetadata =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setLockMetadata',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setOwner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSetOwner =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setOwner',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setReferrerFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractSetReferrerFee =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setReferrerFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"shareKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractShareKey =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'shareKey',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractTransfer =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"unlendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractUnlendKey =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'unlendKey',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateKeyPricing"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractUpdateKeyPricing =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateKeyPricing',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateLockConfig"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractUpdateLockConfig =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateLockConfig',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateRefundPenalty"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractUpdateRefundPenalty =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateRefundPenalty',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateSchemaVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractUpdateSchemaVersion =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateSchemaVersion',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateTransferFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractUpdateTransferFee =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateTransferFee',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const writeCitizenshipContractWithdraw =
  /*#__PURE__*/ createWriteContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContract = /*#__PURE__*/ createSimulateContract(
  { abi: citizenshipContractAbi, address: citizenshipContractAddress },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractAddKeyGranter =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addKeyGranter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"addLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractAddLockManager =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'addLockManager',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractBurn =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"cancelAndRefund"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractCancelAndRefund =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'cancelAndRefund',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"expireAndRefundFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractExpireAndRefundFor =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'expireAndRefundFor',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"extend"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractExtend =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'extend',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeyExtension"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractGrantKeyExtension =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeyExtension',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractGrantKeys =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantKeys',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"lendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractLendKey =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'lendKey',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"mergeKeys"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractMergeKeys =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'mergeKeys',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"migrate"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractMigrate =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'migrate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"purchase"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractPurchase =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'purchase',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renewMembershipFor"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractRenewMembershipFor =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renewMembershipFor',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceLockManager"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractRenounceLockManager =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceLockManager',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeKeyGranter"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractRevokeKeyGranter =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeKeyGranter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setEventHooks"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSetEventHooks =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setEventHooks',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setGasRefundValue"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSetGasRefundValue =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setGasRefundValue',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setKeyManagerOf"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSetKeyManagerOf =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setKeyManagerOf',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setLockMetadata"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSetLockMetadata =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setLockMetadata',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setOwner"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSetOwner =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setOwner',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"setReferrerFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractSetReferrerFee =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'setReferrerFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"shareKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractShareKey =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'shareKey',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"unlendKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractUnlendKey =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'unlendKey',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateKeyPricing"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractUpdateKeyPricing =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateKeyPricing',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateLockConfig"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractUpdateLockConfig =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateLockConfig',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateRefundPenalty"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractUpdateRefundPenalty =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateRefundPenalty',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateSchemaVersion"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractUpdateSchemaVersion =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateSchemaVersion',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"updateTransferFee"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractUpdateTransferFee =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'updateTransferFee',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link citizenshipContractAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const simulateCitizenshipContractWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"CancelKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractCancelKeyEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'CancelKey',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"ExpirationChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractExpirationChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'ExpirationChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"ExpireKey"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractExpireKeyEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'ExpireKey',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"GasRefunded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractGasRefundedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'GasRefunded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyExtended"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractKeyExtendedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyExtended',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyGranterAdded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractKeyGranterAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyGranterAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyGranterRemoved"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractKeyGranterRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyGranterRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeyManagerChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractKeyManagerChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeyManagerChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"KeysMigrated"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractKeysMigratedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'KeysMigrated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockConfig"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractLockConfigEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockConfig',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockManagerAdded"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractLockManagerAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockManagerAdded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockManagerRemoved"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractLockManagerRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockManagerRemoved',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"LockMetadata"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractLockMetadataEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'LockMetadata',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"PricingChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractPricingChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'PricingChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RefundPenaltyChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractRefundPenaltyChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RefundPenaltyChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"TransferFeeChanged"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractTransferFeeChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'TransferFeeChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"UnlockCallFailed"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractUnlockCallFailedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'UnlockCallFailed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link citizenshipContractAbi}__ and `eventName` set to `"Withdrawal"`
 *
 * - [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0x45aCCac0E5C953009cDa713a3b722F87F2907F86)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xdbdd8b233bed095db975f2cd527a714c5fc7db62)
 */
export const watchCitizenshipContractWithdrawalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: citizenshipContractAbi,
    address: citizenshipContractAddress,
    eventName: 'Withdrawal',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContract = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractPermitTypehash = /*#__PURE__*/ createReadContract(
  {
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'PERMIT_TYPEHASH',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractAllowance = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractBalanceOf = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractDecimals = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"isNextOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractIsNextOwner = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'isNextOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"isOwner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractIsOwner = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'isOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractName = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"nonces"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractNonces = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractOwner = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractSymbol = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const readTokenContractTotalSupply = /*#__PURE__*/ createReadContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContract = /*#__PURE__*/ createWriteContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractApprove = /*#__PURE__*/ createWriteContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"cancelOwnershipTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractCancelOwnershipTransfer =
  /*#__PURE__*/ createWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'cancelOwnershipTransfer',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractMint = /*#__PURE__*/ createWriteContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractPermit = /*#__PURE__*/ createWriteContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'permit',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractTransfer = /*#__PURE__*/ createWriteContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractTransferFrom = /*#__PURE__*/ createWriteContract(
  {
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferFrom',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const writeTokenContractTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContract = /*#__PURE__*/ createSimulateContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"cancelOwnershipTransfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractCancelOwnershipTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'cancelOwnershipTransfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractMint = /*#__PURE__*/ createSimulateContract({
  abi: tokenContractAbi,
  address: tokenContractAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"permit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractPermit = /*#__PURE__*/ createSimulateContract(
  {
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'permit',
  },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const simulateTokenContractTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const watchTokenContractEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenContractAbi,
  address: tokenContractAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const watchTokenContractApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const watchTokenContractOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1934e252f840aa98dfce2b6205b3e45c41aef830)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x331E823689314B702396b97FF299D9D2968EFf47)
 */
export const watchTokenContractTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenContractAbi,
    address: tokenContractAddress,
    eventName: 'Transfer',
  })
