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

export type Block_height = {
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


export type HateventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatsEvent_filter>;
};


export type HatsubHatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hat_filter>;
};


export type HatwearersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Wearer_filter>;
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

export type HatBurnedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatBurnedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatBurnedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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
  wearer_?: InputMaybe<Wearer_filter>;
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

export enum HatBurnedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  operator = 'operator',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id',
  wearer = 'wearer',
  wearer__id = 'wearer__id'
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

export type HatCreatedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatCreatedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatCreatedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatCreatedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatDetails = 'hatDetails',
  hatEligibility = 'hatEligibility',
  hatId = 'hatId',
  hatImageUri = 'hatImageUri',
  hatMaxSupply = 'hatMaxSupply',
  hatMutable = 'hatMutable',
  hatToggle = 'hatToggle',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
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

export type HatDetailsChangedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatDetailsChangedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatDetailsChangedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatDetailsChangedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hatNewDetails = 'hatNewDetails',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
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

export type HatEligibilityChangedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatEligibilityChangedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatEligibilityChangedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatEligibilityChangedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hatNewEligibility = 'hatNewEligibility',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
}

export type HatImageURIChangedEvent = HatsEvent & {
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

export type HatImageURIChangedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatImageURIChangedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatImageURIChangedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatImageURIChangedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hatNewImageURI = 'hatNewImageURI',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
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

export type HatMaxSupplyChangedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatMaxSupplyChangedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatMaxSupplyChangedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatMaxSupplyChangedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hatNewMaxSupply = 'hatNewMaxSupply',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
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

export type HatMintedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatMintedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatMintedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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
  wearer_?: InputMaybe<Wearer_filter>;
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

export enum HatMintedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  operator = 'operator',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id',
  wearer = 'wearer',
  wearer__id = 'wearer__id'
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

export type HatMutabilityChangedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatMutabilityChangedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatMutabilityChangedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatMutabilityChangedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
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

export type HatStatusChangedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatStatusChangedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatStatusChangedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatStatusChangedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hatNewStatus = 'hatNewStatus',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
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

export type HatToggleChangedEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatToggleChangedEvent_filter>>>;
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
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatToggleChangedEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatToggleChangedEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hatId = 'hatId',
  hatNewToggle = 'hatNewToggle',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
}

export type Hat_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  admin?: InputMaybe<Scalars['String']>;
  admin_?: InputMaybe<Hat_filter>;
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
  and?: InputMaybe<Array<InputMaybe<Hat_filter>>>;
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
  events_?: InputMaybe<HatsEvent_filter>;
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
  or?: InputMaybe<Array<InputMaybe<Hat_filter>>>;
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
  subHats_?: InputMaybe<Hat_filter>;
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
  tree_?: InputMaybe<Tree_filter>;
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
  wearers_?: InputMaybe<Wearer_filter>;
  wearers_contains?: InputMaybe<Array<Scalars['String']>>;
  wearers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  wearers_not?: InputMaybe<Array<Scalars['String']>>;
  wearers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  wearers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Hat_orderBy {
  admin = 'admin',
  admin__createdAt = 'admin__createdAt',
  admin__currentSupply = 'admin__currentSupply',
  admin__details = 'admin__details',
  admin__eligibility = 'admin__eligibility',
  admin__id = 'admin__id',
  admin__imageUri = 'admin__imageUri',
  admin__level = 'admin__level',
  admin__maxSupply = 'admin__maxSupply',
  admin__mutable = 'admin__mutable',
  admin__prettyId = 'admin__prettyId',
  admin__status = 'admin__status',
  admin__toggle = 'admin__toggle',
  createdAt = 'createdAt',
  currentSupply = 'currentSupply',
  details = 'details',
  eligibility = 'eligibility',
  events = 'events',
  id = 'id',
  imageUri = 'imageUri',
  level = 'level',
  maxSupply = 'maxSupply',
  mutable = 'mutable',
  prettyId = 'prettyId',
  status = 'status',
  subHats = 'subHats',
  toggle = 'toggle',
  tree = 'tree',
  tree__id = 'tree__id',
  wearers = 'wearers'
}

export type HatsEvent = {
  blockNumber: Scalars['Int'];
  hat: Hat;
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  transactionID: Scalars['Bytes'];
  tree: Tree;
};

export type HatsEvent_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HatsEvent_filter>>>;
  blockNumber?: InputMaybe<Scalars['Int']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber_lt?: InputMaybe<Scalars['Int']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']>;
  blockNumber_not?: InputMaybe<Scalars['Int']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']>>;
  hat?: InputMaybe<Scalars['String']>;
  hat_?: InputMaybe<Hat_filter>;
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
  or?: InputMaybe<Array<InputMaybe<HatsEvent_filter>>>;
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
  tree_?: InputMaybe<Tree_filter>;
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

export enum HatsEvent_orderBy {
  blockNumber = 'blockNumber',
  hat = 'hat',
  hat__createdAt = 'hat__createdAt',
  hat__currentSupply = 'hat__currentSupply',
  hat__details = 'hat__details',
  hat__eligibility = 'hat__eligibility',
  hat__id = 'hat__id',
  hat__imageUri = 'hat__imageUri',
  hat__level = 'hat__level',
  hat__maxSupply = 'hat__maxSupply',
  hat__mutable = 'hat__mutable',
  hat__prettyId = 'hat__prettyId',
  hat__status = 'hat__status',
  hat__toggle = 'hat__toggle',
  id = 'id',
  timestamp = 'timestamp',
  transactionID = 'transactionID',
  tree = 'tree',
  tree__id = 'tree__id'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
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
  hatImageURIChangedEvent?: Maybe<HatImageURIChangedEvent>;
  hatImageURIChangedEvents: Array<HatImageURIChangedEvent>;
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


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type QueryhatArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatBurnedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatBurnedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatBurnedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatBurnedEvent_filter>;
};


export type QueryhatCreatedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatCreatedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatCreatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatCreatedEvent_filter>;
};


export type QueryhatDetailsChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatDetailsChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatDetailsChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatDetailsChangedEvent_filter>;
};


export type QueryhatEligibilityChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatEligibilityChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatEligibilityChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatEligibilityChangedEvent_filter>;
};


export type QueryhatImageURIChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatImageURIChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatImageURIChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatImageURIChangedEvent_filter>;
};


export type QueryhatMaxSupplyChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatMaxSupplyChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMaxSupplyChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMaxSupplyChangedEvent_filter>;
};


export type QueryhatMintedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatMintedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMintedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMintedEvent_filter>;
};


export type QueryhatMutabilityChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatMutabilityChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMutabilityChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMutabilityChangedEvent_filter>;
};


export type QueryhatStatusChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatStatusChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatStatusChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatStatusChangedEvent_filter>;
};


export type QueryhatToggleChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatToggleChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatToggleChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatToggleChangedEvent_filter>;
};


export type QueryhatsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hat_filter>;
};


export type QueryhatsEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhatsEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatsEvent_filter>;
};


export type QuerytreeArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytreesArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tree_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tree_filter>;
};


export type QuerywearerArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywearersArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wearer_filter>;
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
  hatImageURIChangedEvent?: Maybe<HatImageURIChangedEvent>;
  hatImageURIChangedEvents: Array<HatImageURIChangedEvent>;
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


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};


export type SubscriptionhatArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatBurnedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatBurnedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatBurnedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatBurnedEvent_filter>;
};


export type SubscriptionhatCreatedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatCreatedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatCreatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatCreatedEvent_filter>;
};


export type SubscriptionhatDetailsChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatDetailsChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatDetailsChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatDetailsChangedEvent_filter>;
};


export type SubscriptionhatEligibilityChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatEligibilityChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatEligibilityChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatEligibilityChangedEvent_filter>;
};


export type SubscriptionhatImageURIChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatImageURIChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatImageURIChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatImageURIChangedEvent_filter>;
};


export type SubscriptionhatMaxSupplyChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatMaxSupplyChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMaxSupplyChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMaxSupplyChangedEvent_filter>;
};


export type SubscriptionhatMintedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatMintedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMintedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMintedEvent_filter>;
};


export type SubscriptionhatMutabilityChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatMutabilityChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMutabilityChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatMutabilityChangedEvent_filter>;
};


export type SubscriptionhatStatusChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatStatusChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatStatusChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatStatusChangedEvent_filter>;
};


export type SubscriptionhatToggleChangedEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatToggleChangedEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatToggleChangedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatToggleChangedEvent_filter>;
};


export type SubscriptionhatsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hat_filter>;
};


export type SubscriptionhatsEventArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhatsEventsArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HatsEvent_filter>;
};


export type SubscriptiontreeArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontreesArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tree_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tree_filter>;
};


export type SubscriptionwearerArgs = {
  block?: InputMaybe<Block_height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwearersArgs = {
  block?: InputMaybe<Block_height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wearer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wearer_filter>;
};

export type Tree = {
  __typename?: 'Tree';
  events: Array<HatsEvent>;
  hats: Array<Hat>;
  /** Tree ID is its top hat domain - first 4 bytes of the top hat ID */
  id: Scalars['ID'];
};


export type TreeeventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatsEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatsEvent_filter>;
};


export type TreehatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hat_filter>;
};

export type Tree_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Tree_filter>>>;
  events_?: InputMaybe<HatsEvent_filter>;
  hats_?: InputMaybe<Hat_filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<Tree_filter>>>;
};

export enum Tree_orderBy {
  events = 'events',
  hats = 'hats',
  id = 'id'
}

export type Wearer = {
  __typename?: 'Wearer';
  burnEvent: Array<HatBurnedEvent>;
  currentHats: Array<Hat>;
  id: Scalars['ID'];
  mintEvent: Array<HatMintedEvent>;
};


export type WearerburnEventArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatBurnedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatBurnedEvent_filter>;
};


export type WearercurrentHatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hat_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hat_filter>;
};


export type WearermintEventArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HatMintedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HatMintedEvent_filter>;
};

export type Wearer_filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Wearer_filter>>>;
  burnEvent_?: InputMaybe<HatBurnedEvent_filter>;
  currentHats_?: InputMaybe<Hat_filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  mintEvent_?: InputMaybe<HatMintedEvent_filter>;
  or?: InputMaybe<Array<InputMaybe<Wearer_filter>>>;
};

export enum Wearer_orderBy {
  burnEvent = 'burnEvent',
  currentHats = 'currentHats',
  id = 'id',
  mintEvent = 'mintEvent'
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
  allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = 'deny'
}

export type GetHatsByIdsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type GetHatsByIdsQuery = { __typename?: 'Query', hats: Array<{ __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } }> };

export type GetHatsEventsQueryVariables = Exact<{
  treeId: Scalars['String'];
  startBlock: Scalars['Int'];
  endBlock: Scalars['Int'];
}>;


export type GetHatsEventsQuery = { __typename?: 'Query', hatsEvents: Array<{ __typename?: 'HatBurnedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, wearer: { __typename?: 'Wearer', id: string }, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatCreatedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatDetailsChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatEligibilityChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatImageURIChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatMaxSupplyChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatMintedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, wearer: { __typename?: 'Wearer', id: string }, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatMutabilityChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatStatusChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } } | { __typename?: 'HatToggleChangedEvent', id: string, transactionID: any, blockNumber: number, timestamp: any, hat: { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } } }> };

export type HatFragment = { __typename?: 'Hat', id: string, prettyId: string, details: string, imageUri: string, level: number, tree: { __typename?: 'Tree', id: string } };

export const HatFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Hat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Hat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prettyId"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"imageUri"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"tree"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<HatFragment, unknown>;
export const GetHatsByIdsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHatsByIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hat"}}]}}]}},...HatFragmentDoc.definitions]} as unknown as DocumentNode<GetHatsByIdsQuery, GetHatsByIdsQueryVariables>;
export const GetHatsEventsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHatsEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"treeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hatsEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"tree"},"value":{"kind":"Variable","name":{"kind":"Name","value":"treeId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startBlock"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"blockNumber_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactionID"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"hat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Hat"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HatMintedEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wearer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HatBurnedEvent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wearer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},...HatFragmentDoc.definitions]} as unknown as DocumentNode<GetHatsEventsQuery, GetHatsEventsQueryVariables>;