/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Hat = {
  __typename?: 'Hat';
  admin: Hat;
  createdAt: Scalars['BigInt'];
  currentSupply: Scalars['BigInt'];
  details: Scalars['String'];
  eligibility: Scalars['String'];
  events: Array<HatsEvent>;
  id: Scalars['ID'];
  imageUri: Scalars['String'];
  level: Scalars['Int'];
  maxSupply: Scalars['BigInt'];
  mutable: Scalars['Boolean'];
  prettyId: Scalars['String'];
  status: Scalars['Boolean'];
  subHats: Array<Hat>;
  toggle: Scalars['String'];
  tree: Tree;
  wearers: Array<Wearer>;
};


export type HatEventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatsEvent_Filter>;
};


export type HatSubHatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hat_Filter>;
};


export type HatWearersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Wearer_Filter>;
};

export type HatBurnedEvent = HatsEvent & {
  __typename?: 'HatBurnedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  id: Scalars['ID'];
  operator: Scalars['String'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
  wearer: Wearer;
};

export type HatBurnedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatBurnedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  operator?: InputMaybe<Scalars['String']>;
  operator_contains?: InputMaybe<Scalars['String']>;
  operator_contains_nocase?: InputMaybe<Scalars['String']>;
  operator_ends_with?: InputMaybe<Scalars['String']>;
  operator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  operator_gt?: InputMaybe<Scalars['String']>;
  operator_gte?: InputMaybe<Scalars['String']>;
  operator_in?: InputMaybe<Array<Scalars['String']>>;
  operator_lt?: InputMaybe<Scalars['String']>;
  operator_lte?: InputMaybe<Scalars['String']>;
  operator_not?: InputMaybe<Scalars['String']>;
  operator_not_contains?: InputMaybe<Scalars['String']>;
  operator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  operator_not_ends_with?: InputMaybe<Scalars['String']>;
  operator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  operator_not_in?: InputMaybe<Array<Scalars['String']>>;
  operator_not_starts_with?: InputMaybe<Scalars['String']>;
  operator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  operator_starts_with?: InputMaybe<Scalars['String']>;
  operator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<HatBurnedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearer?: InputMaybe<Scalars['String']>;
  wearer_?: InputMaybe<Wearer_Filter>;
  wearer_contains?: InputMaybe<Scalars['String']>;
  wearer_contains_nocase?: InputMaybe<Scalars['String']>;
  wearer_ends_with?: InputMaybe<Scalars['String']>;
  wearer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearer_gt?: InputMaybe<Scalars['String']>;
  wearer_gte?: InputMaybe<Scalars['String']>;
  wearer_in?: InputMaybe<Array<Scalars['String']>>;
  wearer_lt?: InputMaybe<Scalars['String']>;
  wearer_lte?: InputMaybe<Scalars['String']>;
  wearer_not?: InputMaybe<Scalars['String']>;
  wearer_not_contains?: InputMaybe<Scalars['String']>;
  wearer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  wearer_not_ends_with?: InputMaybe<Scalars['String']>;
  wearer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearer_not_in?: InputMaybe<Array<Scalars['String']>>;
  wearer_not_starts_with?: InputMaybe<Scalars['String']>;
  wearer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearer_starts_with?: InputMaybe<Scalars['String']>;
  wearer_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatBurnedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  Id = 'id',
  Operator = 'operator',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree',
  Wearer = 'wearer'
}

export type HatCreatedEvent = HatsEvent & {
  __typename?: 'HatCreatedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatDetails: Scalars['String'];
  hatEligibility: Scalars['String'];
  hatId: Scalars['String'];
  hatImageUri: Scalars['String'];
  hatMaxSupply: Scalars['BigInt'];
  hatMutable: Scalars['Boolean'];
  hatToggle: Scalars['String'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatCreatedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatCreatedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatDetails?: InputMaybe<Scalars['String']>;
  hatDetails_contains?: InputMaybe<Scalars['String']>;
  hatDetails_contains_nocase?: InputMaybe<Scalars['String']>;
  hatDetails_ends_with?: InputMaybe<Scalars['String']>;
  hatDetails_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatDetails_gt?: InputMaybe<Scalars['String']>;
  hatDetails_gte?: InputMaybe<Scalars['String']>;
  hatDetails_in?: InputMaybe<Array<Scalars['String']>>;
  hatDetails_lt?: InputMaybe<Scalars['String']>;
  hatDetails_lte?: InputMaybe<Scalars['String']>;
  hatDetails_not?: InputMaybe<Scalars['String']>;
  hatDetails_not_contains?: InputMaybe<Scalars['String']>;
  hatDetails_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatDetails_not_ends_with?: InputMaybe<Scalars['String']>;
  hatDetails_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatDetails_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatDetails_not_starts_with?: InputMaybe<Scalars['String']>;
  hatDetails_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatDetails_starts_with?: InputMaybe<Scalars['String']>;
  hatDetails_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatEligibility?: InputMaybe<Scalars['String']>;
  hatEligibility_contains?: InputMaybe<Scalars['String']>;
  hatEligibility_contains_nocase?: InputMaybe<Scalars['String']>;
  hatEligibility_ends_with?: InputMaybe<Scalars['String']>;
  hatEligibility_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatEligibility_gt?: InputMaybe<Scalars['String']>;
  hatEligibility_gte?: InputMaybe<Scalars['String']>;
  hatEligibility_in?: InputMaybe<Array<Scalars['String']>>;
  hatEligibility_lt?: InputMaybe<Scalars['String']>;
  hatEligibility_lte?: InputMaybe<Scalars['String']>;
  hatEligibility_not?: InputMaybe<Scalars['String']>;
  hatEligibility_not_contains?: InputMaybe<Scalars['String']>;
  hatEligibility_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatEligibility_not_ends_with?: InputMaybe<Scalars['String']>;
  hatEligibility_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatEligibility_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatEligibility_not_starts_with?: InputMaybe<Scalars['String']>;
  hatEligibility_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatEligibility_starts_with?: InputMaybe<Scalars['String']>;
  hatEligibility_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatImageUri?: InputMaybe<Scalars['String']>;
  hatImageUri_contains?: InputMaybe<Scalars['String']>;
  hatImageUri_contains_nocase?: InputMaybe<Scalars['String']>;
  hatImageUri_ends_with?: InputMaybe<Scalars['String']>;
  hatImageUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatImageUri_gt?: InputMaybe<Scalars['String']>;
  hatImageUri_gte?: InputMaybe<Scalars['String']>;
  hatImageUri_in?: InputMaybe<Array<Scalars['String']>>;
  hatImageUri_lt?: InputMaybe<Scalars['String']>;
  hatImageUri_lte?: InputMaybe<Scalars['String']>;
  hatImageUri_not?: InputMaybe<Scalars['String']>;
  hatImageUri_not_contains?: InputMaybe<Scalars['String']>;
  hatImageUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatImageUri_not_ends_with?: InputMaybe<Scalars['String']>;
  hatImageUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatImageUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatImageUri_not_starts_with?: InputMaybe<Scalars['String']>;
  hatImageUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatImageUri_starts_with?: InputMaybe<Scalars['String']>;
  hatImageUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatMaxSupply?: InputMaybe<Scalars['BigInt']>;
  hatMaxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  hatMaxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  hatMaxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hatMaxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  hatMaxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  hatMaxSupply_not?: InputMaybe<Scalars['BigInt']>;
  hatMaxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hatMutable?: InputMaybe<Scalars['Boolean']>;
  hatMutable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hatMutable_not?: InputMaybe<Scalars['Boolean']>;
  hatMutable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hatToggle?: InputMaybe<Scalars['String']>;
  hatToggle_contains?: InputMaybe<Scalars['String']>;
  hatToggle_contains_nocase?: InputMaybe<Scalars['String']>;
  hatToggle_ends_with?: InputMaybe<Scalars['String']>;
  hatToggle_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatToggle_gt?: InputMaybe<Scalars['String']>;
  hatToggle_gte?: InputMaybe<Scalars['String']>;
  hatToggle_in?: InputMaybe<Array<Scalars['String']>>;
  hatToggle_lt?: InputMaybe<Scalars['String']>;
  hatToggle_lte?: InputMaybe<Scalars['String']>;
  hatToggle_not?: InputMaybe<Scalars['String']>;
  hatToggle_not_contains?: InputMaybe<Scalars['String']>;
  hatToggle_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatToggle_not_ends_with?: InputMaybe<Scalars['String']>;
  hatToggle_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatToggle_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatToggle_not_starts_with?: InputMaybe<Scalars['String']>;
  hatToggle_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatToggle_starts_with?: InputMaybe<Scalars['String']>;
  hatToggle_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatCreatedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatCreatedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatDetails = 'hatDetails',
  HatEligibility = 'hatEligibility',
  HatId = 'hatId',
  HatImageUri = 'hatImageUri',
  HatMaxSupply = 'hatMaxSupply',
  HatMutable = 'hatMutable',
  HatToggle = 'hatToggle',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type HatDetailsChangedEvent = HatsEvent & {
  __typename?: 'HatDetailsChangedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  hatNewDetails: Scalars['String'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatDetailsChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatDetailsChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewDetails?: InputMaybe<Scalars['String']>;
  hatNewDetails_contains?: InputMaybe<Scalars['String']>;
  hatNewDetails_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewDetails_ends_with?: InputMaybe<Scalars['String']>;
  hatNewDetails_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewDetails_gt?: InputMaybe<Scalars['String']>;
  hatNewDetails_gte?: InputMaybe<Scalars['String']>;
  hatNewDetails_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewDetails_lt?: InputMaybe<Scalars['String']>;
  hatNewDetails_lte?: InputMaybe<Scalars['String']>;
  hatNewDetails_not?: InputMaybe<Scalars['String']>;
  hatNewDetails_not_contains?: InputMaybe<Scalars['String']>;
  hatNewDetails_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewDetails_not_ends_with?: InputMaybe<Scalars['String']>;
  hatNewDetails_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewDetails_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewDetails_not_starts_with?: InputMaybe<Scalars['String']>;
  hatNewDetails_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewDetails_starts_with?: InputMaybe<Scalars['String']>;
  hatNewDetails_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatDetailsChangedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatDetailsChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  HatNewDetails = 'hatNewDetails',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type HatEligibilityChangedEvent = HatsEvent & {
  __typename?: 'HatEligibilityChangedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  hatNewEligibility: Scalars['String'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatEligibilityChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatEligibilityChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewEligibility?: InputMaybe<Scalars['String']>;
  hatNewEligibility_contains?: InputMaybe<Scalars['String']>;
  hatNewEligibility_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewEligibility_ends_with?: InputMaybe<Scalars['String']>;
  hatNewEligibility_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewEligibility_gt?: InputMaybe<Scalars['String']>;
  hatNewEligibility_gte?: InputMaybe<Scalars['String']>;
  hatNewEligibility_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewEligibility_lt?: InputMaybe<Scalars['String']>;
  hatNewEligibility_lte?: InputMaybe<Scalars['String']>;
  hatNewEligibility_not?: InputMaybe<Scalars['String']>;
  hatNewEligibility_not_contains?: InputMaybe<Scalars['String']>;
  hatNewEligibility_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewEligibility_not_ends_with?: InputMaybe<Scalars['String']>;
  hatNewEligibility_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewEligibility_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewEligibility_not_starts_with?: InputMaybe<Scalars['String']>;
  hatNewEligibility_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewEligibility_starts_with?: InputMaybe<Scalars['String']>;
  hatNewEligibility_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatEligibilityChangedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatEligibilityChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  HatNewEligibility = 'hatNewEligibility',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type HatImageUriChangedEvent = HatsEvent & {
  __typename?: 'HatImageURIChangedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  hatNewImageURI: Scalars['String'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatImageUriChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatImageUriChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewImageURI?: InputMaybe<Scalars['String']>;
  hatNewImageURI_contains?: InputMaybe<Scalars['String']>;
  hatNewImageURI_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewImageURI_ends_with?: InputMaybe<Scalars['String']>;
  hatNewImageURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewImageURI_gt?: InputMaybe<Scalars['String']>;
  hatNewImageURI_gte?: InputMaybe<Scalars['String']>;
  hatNewImageURI_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewImageURI_lt?: InputMaybe<Scalars['String']>;
  hatNewImageURI_lte?: InputMaybe<Scalars['String']>;
  hatNewImageURI_not?: InputMaybe<Scalars['String']>;
  hatNewImageURI_not_contains?: InputMaybe<Scalars['String']>;
  hatNewImageURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewImageURI_not_ends_with?: InputMaybe<Scalars['String']>;
  hatNewImageURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewImageURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewImageURI_not_starts_with?: InputMaybe<Scalars['String']>;
  hatNewImageURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewImageURI_starts_with?: InputMaybe<Scalars['String']>;
  hatNewImageURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatImageUriChangedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatImageUriChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  HatNewImageUri = 'hatNewImageURI',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type HatMaxSupplyChangedEvent = HatsEvent & {
  __typename?: 'HatMaxSupplyChangedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  hatNewMaxSupply: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatMaxSupplyChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatMaxSupplyChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewMaxSupply?: InputMaybe<Scalars['BigInt']>;
  hatNewMaxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  hatNewMaxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  hatNewMaxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hatNewMaxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  hatNewMaxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  hatNewMaxSupply_not?: InputMaybe<Scalars['BigInt']>;
  hatNewMaxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatMaxSupplyChangedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatMaxSupplyChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  HatNewMaxSupply = 'hatNewMaxSupply',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type HatMintedEvent = HatsEvent & {
  __typename?: 'HatMintedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  id: Scalars['ID'];
  operator: Scalars['String'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
  wearer: Wearer;
};

export type HatMintedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatMintedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  operator?: InputMaybe<Scalars['String']>;
  operator_contains?: InputMaybe<Scalars['String']>;
  operator_contains_nocase?: InputMaybe<Scalars['String']>;
  operator_ends_with?: InputMaybe<Scalars['String']>;
  operator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  operator_gt?: InputMaybe<Scalars['String']>;
  operator_gte?: InputMaybe<Scalars['String']>;
  operator_in?: InputMaybe<Array<Scalars['String']>>;
  operator_lt?: InputMaybe<Scalars['String']>;
  operator_lte?: InputMaybe<Scalars['String']>;
  operator_not?: InputMaybe<Scalars['String']>;
  operator_not_contains?: InputMaybe<Scalars['String']>;
  operator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  operator_not_ends_with?: InputMaybe<Scalars['String']>;
  operator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  operator_not_in?: InputMaybe<Array<Scalars['String']>>;
  operator_not_starts_with?: InputMaybe<Scalars['String']>;
  operator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  operator_starts_with?: InputMaybe<Scalars['String']>;
  operator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<HatMintedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearer?: InputMaybe<Scalars['String']>;
  wearer_?: InputMaybe<Wearer_Filter>;
  wearer_contains?: InputMaybe<Scalars['String']>;
  wearer_contains_nocase?: InputMaybe<Scalars['String']>;
  wearer_ends_with?: InputMaybe<Scalars['String']>;
  wearer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearer_gt?: InputMaybe<Scalars['String']>;
  wearer_gte?: InputMaybe<Scalars['String']>;
  wearer_in?: InputMaybe<Array<Scalars['String']>>;
  wearer_lt?: InputMaybe<Scalars['String']>;
  wearer_lte?: InputMaybe<Scalars['String']>;
  wearer_not?: InputMaybe<Scalars['String']>;
  wearer_not_contains?: InputMaybe<Scalars['String']>;
  wearer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  wearer_not_ends_with?: InputMaybe<Scalars['String']>;
  wearer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wearer_not_in?: InputMaybe<Array<Scalars['String']>>;
  wearer_not_starts_with?: InputMaybe<Scalars['String']>;
  wearer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearer_starts_with?: InputMaybe<Scalars['String']>;
  wearer_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatMintedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  Id = 'id',
  Operator = 'operator',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree',
  Wearer = 'wearer'
}

export type HatMutabilityChangedEvent = HatsEvent & {
  __typename?: 'HatMutabilityChangedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatMutabilityChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatMutabilityChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatMutabilityChangedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatMutabilityChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type HatStatusChangedEvent = HatsEvent & {
  __typename?: 'HatStatusChangedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  hatNewStatus: Scalars['Boolean'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatStatusChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatStatusChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewStatus?: InputMaybe<Scalars['Boolean']>;
  hatNewStatus_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hatNewStatus_not?: InputMaybe<Scalars['Boolean']>;
  hatNewStatus_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatStatusChangedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatStatusChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  HatNewStatus = 'hatNewStatus',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type HatToggleChangedEvent = HatsEvent & {
  __typename?: 'HatToggleChangedEvent';
  blockNumber: Scalars['Int'];
  hat: Hat;
  hatId: Scalars['String'];
  hatNewToggle: Scalars['String'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatToggleChangedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatToggleChangedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hatId?: InputMaybe<Scalars['String']>;
  hatId_contains?: InputMaybe<Scalars['String']>;
  hatId_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_ends_with?: InputMaybe<Scalars['String']>;
  hatId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_gt?: InputMaybe<Scalars['String']>;
  hatId_gte?: InputMaybe<Scalars['String']>;
  hatId_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_lt?: InputMaybe<Scalars['String']>;
  hatId_lte?: InputMaybe<Scalars['String']>;
  hatId_not?: InputMaybe<Scalars['String']>;
  hatId_not_contains?: InputMaybe<Scalars['String']>;
  hatId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with?: InputMaybe<Scalars['String']>;
  hatId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatId_not_starts_with?: InputMaybe<Scalars['String']>;
  hatId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatId_starts_with?: InputMaybe<Scalars['String']>;
  hatId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewToggle?: InputMaybe<Scalars['String']>;
  hatNewToggle_contains?: InputMaybe<Scalars['String']>;
  hatNewToggle_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewToggle_ends_with?: InputMaybe<Scalars['String']>;
  hatNewToggle_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewToggle_gt?: InputMaybe<Scalars['String']>;
  hatNewToggle_gte?: InputMaybe<Scalars['String']>;
  hatNewToggle_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewToggle_lt?: InputMaybe<Scalars['String']>;
  hatNewToggle_lte?: InputMaybe<Scalars['String']>;
  hatNewToggle_not?: InputMaybe<Scalars['String']>;
  hatNewToggle_not_contains?: InputMaybe<Scalars['String']>;
  hatNewToggle_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hatNewToggle_not_ends_with?: InputMaybe<Scalars['String']>;
  hatNewToggle_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewToggle_not_in?: InputMaybe<Array<Scalars['String']>>;
  hatNewToggle_not_starts_with?: InputMaybe<Scalars['String']>;
  hatNewToggle_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hatNewToggle_starts_with?: InputMaybe<Scalars['String']>;
  hatNewToggle_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatToggleChangedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatToggleChangedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  HatId = 'hatId',
  HatNewToggle = 'hatNewToggle',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

export type Hat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  admin?: InputMaybe<Scalars['String']>;
  admin_?: InputMaybe<Hat_Filter>;
  admin_contains?: InputMaybe<Scalars['String']>;
  admin_contains_nocase?: InputMaybe<Scalars['String']>;
  admin_ends_with?: InputMaybe<Scalars['String']>;
  admin_ends_with_nocase?: InputMaybe<Scalars['String']>;
  admin_gt?: InputMaybe<Scalars['String']>;
  admin_gte?: InputMaybe<Scalars['String']>;
  admin_in?: InputMaybe<Array<Scalars['String']>>;
  admin_lt?: InputMaybe<Scalars['String']>;
  admin_lte?: InputMaybe<Scalars['String']>;
  admin_not?: InputMaybe<Scalars['String']>;
  admin_not_contains?: InputMaybe<Scalars['String']>;
  admin_not_contains_nocase?: InputMaybe<Scalars['String']>;
  admin_not_ends_with?: InputMaybe<Scalars['String']>;
  admin_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  admin_not_in?: InputMaybe<Array<Scalars['String']>>;
  admin_not_starts_with?: InputMaybe<Scalars['String']>;
  admin_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  admin_starts_with?: InputMaybe<Scalars['String']>;
  admin_starts_with_nocase?: InputMaybe<Scalars['String']>;
  and?: InputMaybe<Array<InputMaybe<Hat_Filter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply?: InputMaybe<Scalars['BigInt']>;
  currentSupply_gt?: InputMaybe<Scalars['BigInt']>;
  currentSupply_gte?: InputMaybe<Scalars['BigInt']>;
  currentSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentSupply_lt?: InputMaybe<Scalars['BigInt']>;
  currentSupply_lte?: InputMaybe<Scalars['BigInt']>;
  currentSupply_not?: InputMaybe<Scalars['BigInt']>;
  currentSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  details?: InputMaybe<Scalars['String']>;
  details_contains?: InputMaybe<Scalars['String']>;
  details_contains_nocase?: InputMaybe<Scalars['String']>;
  details_ends_with?: InputMaybe<Scalars['String']>;
  details_ends_with_nocase?: InputMaybe<Scalars['String']>;
  details_gt?: InputMaybe<Scalars['String']>;
  details_gte?: InputMaybe<Scalars['String']>;
  details_in?: InputMaybe<Array<Scalars['String']>>;
  details_lt?: InputMaybe<Scalars['String']>;
  details_lte?: InputMaybe<Scalars['String']>;
  details_not?: InputMaybe<Scalars['String']>;
  details_not_contains?: InputMaybe<Scalars['String']>;
  details_not_contains_nocase?: InputMaybe<Scalars['String']>;
  details_not_ends_with?: InputMaybe<Scalars['String']>;
  details_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  details_not_in?: InputMaybe<Array<Scalars['String']>>;
  details_not_starts_with?: InputMaybe<Scalars['String']>;
  details_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  details_starts_with?: InputMaybe<Scalars['String']>;
  details_starts_with_nocase?: InputMaybe<Scalars['String']>;
  eligibility?: InputMaybe<Scalars['String']>;
  eligibility_contains?: InputMaybe<Scalars['String']>;
  eligibility_contains_nocase?: InputMaybe<Scalars['String']>;
  eligibility_ends_with?: InputMaybe<Scalars['String']>;
  eligibility_ends_with_nocase?: InputMaybe<Scalars['String']>;
  eligibility_gt?: InputMaybe<Scalars['String']>;
  eligibility_gte?: InputMaybe<Scalars['String']>;
  eligibility_in?: InputMaybe<Array<Scalars['String']>>;
  eligibility_lt?: InputMaybe<Scalars['String']>;
  eligibility_lte?: InputMaybe<Scalars['String']>;
  eligibility_not?: InputMaybe<Scalars['String']>;
  eligibility_not_contains?: InputMaybe<Scalars['String']>;
  eligibility_not_contains_nocase?: InputMaybe<Scalars['String']>;
  eligibility_not_ends_with?: InputMaybe<Scalars['String']>;
  eligibility_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  eligibility_not_in?: InputMaybe<Array<Scalars['String']>>;
  eligibility_not_starts_with?: InputMaybe<Scalars['String']>;
  eligibility_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  eligibility_starts_with?: InputMaybe<Scalars['String']>;
  eligibility_starts_with_nocase?: InputMaybe<Scalars['String']>;
  events_?: InputMaybe<HatsEvent_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  imageUri?: InputMaybe<Scalars['String']>;
  imageUri_contains?: InputMaybe<Scalars['String']>;
  imageUri_contains_nocase?: InputMaybe<Scalars['String']>;
  imageUri_ends_with?: InputMaybe<Scalars['String']>;
  imageUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  imageUri_gt?: InputMaybe<Scalars['String']>;
  imageUri_gte?: InputMaybe<Scalars['String']>;
  imageUri_in?: InputMaybe<Array<Scalars['String']>>;
  imageUri_lt?: InputMaybe<Scalars['String']>;
  imageUri_lte?: InputMaybe<Scalars['String']>;
  imageUri_not?: InputMaybe<Scalars['String']>;
  imageUri_not_contains?: InputMaybe<Scalars['String']>;
  imageUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  imageUri_not_ends_with?: InputMaybe<Scalars['String']>;
  imageUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  imageUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  imageUri_not_starts_with?: InputMaybe<Scalars['String']>;
  imageUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  imageUri_starts_with?: InputMaybe<Scalars['String']>;
  imageUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
  level_gt?: InputMaybe<Scalars['Int']>;
  level_gte?: InputMaybe<Scalars['Int']>;
  level_in?: InputMaybe<Array<Scalars['Int']>>;
  level_lt?: InputMaybe<Scalars['Int']>;
  level_lte?: InputMaybe<Scalars['Int']>;
  level_not?: InputMaybe<Scalars['Int']>;
  level_not_in?: InputMaybe<Array<Scalars['Int']>>;
  maxSupply?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_not?: InputMaybe<Scalars['BigInt']>;
  maxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mutable?: InputMaybe<Scalars['Boolean']>;
  mutable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  mutable_not?: InputMaybe<Scalars['Boolean']>;
  mutable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  or?: InputMaybe<Array<InputMaybe<Hat_Filter>>>;
  prettyId?: InputMaybe<Scalars['String']>;
  prettyId_contains?: InputMaybe<Scalars['String']>;
  prettyId_contains_nocase?: InputMaybe<Scalars['String']>;
  prettyId_ends_with?: InputMaybe<Scalars['String']>;
  prettyId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  prettyId_gt?: InputMaybe<Scalars['String']>;
  prettyId_gte?: InputMaybe<Scalars['String']>;
  prettyId_in?: InputMaybe<Array<Scalars['String']>>;
  prettyId_lt?: InputMaybe<Scalars['String']>;
  prettyId_lte?: InputMaybe<Scalars['String']>;
  prettyId_not?: InputMaybe<Scalars['String']>;
  prettyId_not_contains?: InputMaybe<Scalars['String']>;
  prettyId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  prettyId_not_ends_with?: InputMaybe<Scalars['String']>;
  prettyId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  prettyId_not_in?: InputMaybe<Array<Scalars['String']>>;
  prettyId_not_starts_with?: InputMaybe<Scalars['String']>;
  prettyId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  prettyId_starts_with?: InputMaybe<Scalars['String']>;
  prettyId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Boolean']>;
  status_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status_not?: InputMaybe<Scalars['Boolean']>;
  status_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  subHats_?: InputMaybe<Hat_Filter>;
  toggle?: InputMaybe<Scalars['String']>;
  toggle_contains?: InputMaybe<Scalars['String']>;
  toggle_contains_nocase?: InputMaybe<Scalars['String']>;
  toggle_ends_with?: InputMaybe<Scalars['String']>;
  toggle_ends_with_nocase?: InputMaybe<Scalars['String']>;
  toggle_gt?: InputMaybe<Scalars['String']>;
  toggle_gte?: InputMaybe<Scalars['String']>;
  toggle_in?: InputMaybe<Array<Scalars['String']>>;
  toggle_lt?: InputMaybe<Scalars['String']>;
  toggle_lte?: InputMaybe<Scalars['String']>;
  toggle_not?: InputMaybe<Scalars['String']>;
  toggle_not_contains?: InputMaybe<Scalars['String']>;
  toggle_not_contains_nocase?: InputMaybe<Scalars['String']>;
  toggle_not_ends_with?: InputMaybe<Scalars['String']>;
  toggle_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  toggle_not_in?: InputMaybe<Array<Scalars['String']>>;
  toggle_not_starts_with?: InputMaybe<Scalars['String']>;
  toggle_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  toggle_starts_with?: InputMaybe<Scalars['String']>;
  toggle_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wearers?: InputMaybe<Array<Scalars['String']>>;
  wearers_?: InputMaybe<Wearer_Filter>;
  wearers_contains?: InputMaybe<Array<Scalars['String']>>;
  wearers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  wearers_not?: InputMaybe<Array<Scalars['String']>>;
  wearers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  wearers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Hat_OrderBy {
  Admin = 'admin',
  CreatedAt = 'createdAt',
  CurrentSupply = 'currentSupply',
  Details = 'details',
  Eligibility = 'eligibility',
  Events = 'events',
  Id = 'id',
  ImageUri = 'imageUri',
  Level = 'level',
  MaxSupply = 'maxSupply',
  Mutable = 'mutable',
  PrettyId = 'prettyId',
  Status = 'status',
  SubHats = 'subHats',
  Toggle = 'toggle',
  Tree = 'tree',
  Wearers = 'wearers'
}

export type HatsEvent = {
  blockNumber: Scalars['Int'];
  hat: Hat;
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatsEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatsEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_Filter>;
  hat_contains?: InputMaybe<Scalars['String']>;
  hat_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_ends_with?: InputMaybe<Scalars['String']>;
  hat_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_gt?: InputMaybe<Scalars['String']>;
  hat_gte?: InputMaybe<Scalars['String']>;
  hat_in?: InputMaybe<Array<Scalars['String']>>;
  hat_lt?: InputMaybe<Scalars['String']>;
  hat_lte?: InputMaybe<Scalars['String']>;
  hat_not?: InputMaybe<Scalars['String']>;
  hat_not_contains?: InputMaybe<Scalars['String']>;
  hat_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hat_not_ends_with?: InputMaybe<Scalars['String']>;
  hat_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hat_not_in?: InputMaybe<Array<Scalars['String']>>;
  hat_not_starts_with?: InputMaybe<Scalars['String']>;
  hat_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hat_starts_with?: InputMaybe<Scalars['String']>;
  hat_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<HatsEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionID?: InputMaybe<Scalars['Bytes']>;
  transactionID_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_gt?: InputMaybe<Scalars['Bytes']>;
  transactionID_gte?: InputMaybe<Scalars['Bytes']>;
  transactionID_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionID_lt?: InputMaybe<Scalars['Bytes']>;
  transactionID_lte?: InputMaybe<Scalars['Bytes']>;
  transactionID_not?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionID_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tree?: InputMaybe<Scalars['String']>;
  tree_?: InputMaybe<Tree_Filter>;
  tree_contains?: InputMaybe<Scalars['String']>;
  tree_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_ends_with?: InputMaybe<Scalars['String']>;
  tree_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_gt?: InputMaybe<Scalars['String']>;
  tree_gte?: InputMaybe<Scalars['String']>;
  tree_in?: InputMaybe<Array<Scalars['String']>>;
  tree_lt?: InputMaybe<Scalars['String']>;
  tree_lte?: InputMaybe<Scalars['String']>;
  tree_not?: InputMaybe<Scalars['String']>;
  tree_not_contains?: InputMaybe<Scalars['String']>;
  tree_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tree_not_ends_with?: InputMaybe<Scalars['String']>;
  tree_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tree_not_in?: InputMaybe<Array<Scalars['String']>>;
  tree_not_starts_with?: InputMaybe<Scalars['String']>;
  tree_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tree_starts_with?: InputMaybe<Scalars['String']>;
  tree_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum HatsEvent_OrderBy {
  BlockNumber = 'blockNumber',
  Hat = 'hat',
  Id = 'id',
  Timestamp = 'timestamp',
  TransactionId = 'transactionID',
  Tree = 'tree'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  hat?: Maybe<Hat>;
  hatBurnedEvent?: Maybe<HatBurnedEvent>;
  hatBurnedEvents: Array<HatBurnedEvent>;
  hatCreatedEvent?: Maybe<HatCreatedEvent>;
  hatCreatedEvents: Array<HatCreatedEvent>;
  hatDetailsChangedEvent?: Maybe<HatDetailsChangedEvent>;
  hatDetailsChangedEvents: Array<HatDetailsChangedEvent>;
  hatEligibilityChangedEvent?: Maybe<HatEligibilityChangedEvent>;
  hatEligibilityChangedEvents: Array<HatEligibilityChangedEvent>;
  hatImageURIChangedEvent?: Maybe<HatImageUriChangedEvent>;
  hatImageURIChangedEvents: Array<HatImageUriChangedEvent>;
  hatMaxSupplyChangedEvent?: Maybe<HatMaxSupplyChangedEvent>;
  hatMaxSupplyChangedEvents: Array<HatMaxSupplyChangedEvent>;
  hatMintedEvent?: Maybe<HatMintedEvent>;
  hatMintedEvents: Array<HatMintedEvent>;
  hatMutabilityChangedEvent?: Maybe<HatMutabilityChangedEvent>;
  hatMutabilityChangedEvents: Array<HatMutabilityChangedEvent>;
  hatStatusChangedEvent?: Maybe<HatStatusChangedEvent>;
  hatStatusChangedEvents: Array<HatStatusChangedEvent>;
  hatToggleChangedEvent?: Maybe<HatToggleChangedEvent>;
  hatToggleChangedEvents: Array<HatToggleChangedEvent>;
  hats: Array<Hat>;
  hatsEvent?: Maybe<HatsEvent>;
  hatsEvents: Array<HatsEvent>;
  tree?: Maybe<Tree>;
  trees: Array<Tree>;
  wearer?: Maybe<Wearer>;
  wearers: Array<Wearer>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryHatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatBurnedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatBurnedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatBurnedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatBurnedEvent_Filter>;
};


export type QueryHatCreatedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatCreatedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatCreatedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatCreatedEvent_Filter>;
};


export type QueryHatDetailsChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatDetailsChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatDetailsChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatDetailsChangedEvent_Filter>;
};


export type QueryHatEligibilityChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatEligibilityChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatEligibilityChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatEligibilityChangedEvent_Filter>;
};


export type QueryHatImageUriChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatImageUriChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatImageUriChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatImageUriChangedEvent_Filter>;
};


export type QueryHatMaxSupplyChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatMaxSupplyChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMaxSupplyChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMaxSupplyChangedEvent_Filter>;
};


export type QueryHatMintedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatMintedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMintedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMintedEvent_Filter>;
};


export type QueryHatMutabilityChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatMutabilityChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMutabilityChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMutabilityChangedEvent_Filter>;
};


export type QueryHatStatusChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatStatusChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatStatusChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatStatusChangedEvent_Filter>;
};


export type QueryHatToggleChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatToggleChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatToggleChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatToggleChangedEvent_Filter>;
};


export type QueryHatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hat_Filter>;
};


export type QueryHatsEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHatsEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatsEvent_Filter>;
};


export type QueryTreeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTreesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tree_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tree_Filter>;
};


export type QueryWearerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWearersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wearer_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  hat?: Maybe<Hat>;
  hatBurnedEvent?: Maybe<HatBurnedEvent>;
  hatBurnedEvents: Array<HatBurnedEvent>;
  hatCreatedEvent?: Maybe<HatCreatedEvent>;
  hatCreatedEvents: Array<HatCreatedEvent>;
  hatDetailsChangedEvent?: Maybe<HatDetailsChangedEvent>;
  hatDetailsChangedEvents: Array<HatDetailsChangedEvent>;
  hatEligibilityChangedEvent?: Maybe<HatEligibilityChangedEvent>;
  hatEligibilityChangedEvents: Array<HatEligibilityChangedEvent>;
  hatImageURIChangedEvent?: Maybe<HatImageUriChangedEvent>;
  hatImageURIChangedEvents: Array<HatImageUriChangedEvent>;
  hatMaxSupplyChangedEvent?: Maybe<HatMaxSupplyChangedEvent>;
  hatMaxSupplyChangedEvents: Array<HatMaxSupplyChangedEvent>;
  hatMintedEvent?: Maybe<HatMintedEvent>;
  hatMintedEvents: Array<HatMintedEvent>;
  hatMutabilityChangedEvent?: Maybe<HatMutabilityChangedEvent>;
  hatMutabilityChangedEvents: Array<HatMutabilityChangedEvent>;
  hatStatusChangedEvent?: Maybe<HatStatusChangedEvent>;
  hatStatusChangedEvents: Array<HatStatusChangedEvent>;
  hatToggleChangedEvent?: Maybe<HatToggleChangedEvent>;
  hatToggleChangedEvents: Array<HatToggleChangedEvent>;
  hats: Array<Hat>;
  hatsEvent?: Maybe<HatsEvent>;
  hatsEvents: Array<HatsEvent>;
  tree?: Maybe<Tree>;
  trees: Array<Tree>;
  wearer?: Maybe<Wearer>;
  wearers: Array<Wearer>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionHatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatBurnedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatBurnedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatBurnedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatBurnedEvent_Filter>;
};


export type SubscriptionHatCreatedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatCreatedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatCreatedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatCreatedEvent_Filter>;
};


export type SubscriptionHatDetailsChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatDetailsChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatDetailsChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatDetailsChangedEvent_Filter>;
};


export type SubscriptionHatEligibilityChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatEligibilityChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatEligibilityChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatEligibilityChangedEvent_Filter>;
};


export type SubscriptionHatImageUriChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatImageUriChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatImageUriChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatImageUriChangedEvent_Filter>;
};


export type SubscriptionHatMaxSupplyChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatMaxSupplyChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMaxSupplyChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMaxSupplyChangedEvent_Filter>;
};


export type SubscriptionHatMintedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatMintedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMintedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMintedEvent_Filter>;
};


export type SubscriptionHatMutabilityChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatMutabilityChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMutabilityChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMutabilityChangedEvent_Filter>;
};


export type SubscriptionHatStatusChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatStatusChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatStatusChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatStatusChangedEvent_Filter>;
};


export type SubscriptionHatToggleChangedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatToggleChangedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatToggleChangedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatToggleChangedEvent_Filter>;
};


export type SubscriptionHatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hat_Filter>;
};


export type SubscriptionHatsEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHatsEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatsEvent_Filter>;
};


export type SubscriptionTreeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTreesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tree_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tree_Filter>;
};


export type SubscriptionWearerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWearersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wearer_Filter>;
};

export type Tree = {
  __typename?: 'Tree';
  events: Array<HatsEvent>;
  hats: Array<Hat>;
  /** Tree ID is its top hat domain - first 4 bytes of the top hat ID */
  id: Scalars['ID'];
};


export type TreeEventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatsEvent_Filter>;
};


export type TreeHatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hat_Filter>;
};

export type Tree_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Tree_Filter>>>;
  events_?: InputMaybe<HatsEvent_Filter>;
  hats_?: InputMaybe<Hat_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Tree_Filter>>>;
};

export enum Tree_OrderBy {
  Events = 'events',
  Hats = 'hats',
  Id = 'id'
}

export type Wearer = {
  __typename?: 'Wearer';
  burnEvent: Array<HatBurnedEvent>;
  currentHats: Array<Hat>;
  id: Scalars['ID'];
  mintEvent: Array<HatMintedEvent>;
};


export type WearerBurnEventArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatBurnedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatBurnedEvent_Filter>;
};


export type WearerCurrentHatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hat_Filter>;
};


export type WearerMintEventArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMintedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatMintedEvent_Filter>;
};

export type Wearer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Wearer_Filter>>>;
  burnEvent_?: InputMaybe<HatBurnedEvent_Filter>;
  currentHats_?: InputMaybe<Hat_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  mintEvent_?: InputMaybe<HatMintedEvent_Filter>;
  or?: InputMaybe<Array<InputMaybe<Wearer_Filter>>>;
};

export enum Wearer_OrderBy {
  BurnEvent = 'burnEvent',
  CurrentHats = 'currentHats',
  Id = 'id',
  MintEvent = 'mintEvent'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetHatsEventsQueryVariables = Exact<{
  treeId: Scalars['String'];
  startBlock: Scalars['Int'];
  endBlock: Scalars['Int'];
}>;


export type GetHatsEventsQuery = { __typename?: 'Query', hatsEvents: Array<{ __typename?: 'HatBurnedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, wearer: { __typename?: 'Wearer', id: string }, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatCreatedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatDetailsChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatEligibilityChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatImageURIChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatMaxSupplyChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatMintedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, wearer: { __typename?: 'Wearer', id: string }, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatMutabilityChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatStatusChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatToggleChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } }> };


export const GetHatsEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHatsEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"treeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hatsEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tree"},"value":{"kind":"Variable","name":{"kind":"Name","value":"treeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionID"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"hat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prettyId"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"imageUri"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"tree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HatMintedEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wearer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HatBurnedEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wearer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetHatsEventsQuery, GetHatsEventsQueryVariables>;