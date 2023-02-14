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

export type Badge = {
  __typename?: 'Badge';
  createdAt: Scalars['Int'];
  from: Scalars['Bytes'];
  id: Scalars['String'];
  owner: Scalars['Bytes'];
  spec: BadgeSpec;
  status?: Maybe<Scalars['String']>;
  statusReason?: Maybe<Scalars['String']>;
  statusUpdatedAt?: Maybe<Scalars['Int']>;
  statusUpdatedBy?: Maybe<Scalars['String']>;
};

export type BadgeSpec = {
  __typename?: 'BadgeSpec';
  badges: Array<Badge>;
  createdAt: Scalars['Int'];
  createdBy: Scalars['String'];
  id: Scalars['String'];
  metadata?: Maybe<SpecMetadata>;
  raft: Raft;
  specUri: Scalars['String'];
  totalBadgesCount: Scalars['Int'];
  uri: Scalars['String'];
};


export type BadgeSpecBadgesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Badge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Badge_Filter>;
};

export type BadgeSpec_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BadgeSpec_Filter>>>;
  badges_?: InputMaybe<Badge_Filter>;
  createdAt?: InputMaybe<Scalars['Int']>;
  createdAt_gt?: InputMaybe<Scalars['Int']>;
  createdAt_gte?: InputMaybe<Scalars['Int']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']>>;
  createdAt_lt?: InputMaybe<Scalars['Int']>;
  createdAt_lte?: InputMaybe<Scalars['Int']>;
  createdAt_not?: InputMaybe<Scalars['Int']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']>>;
  createdBy?: InputMaybe<Scalars['String']>;
  createdBy_contains?: InputMaybe<Scalars['String']>;
  createdBy_contains_nocase?: InputMaybe<Scalars['String']>;
  createdBy_ends_with?: InputMaybe<Scalars['String']>;
  createdBy_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy_gt?: InputMaybe<Scalars['String']>;
  createdBy_gte?: InputMaybe<Scalars['String']>;
  createdBy_in?: InputMaybe<Array<Scalars['String']>>;
  createdBy_lt?: InputMaybe<Scalars['String']>;
  createdBy_lte?: InputMaybe<Scalars['String']>;
  createdBy_not?: InputMaybe<Scalars['String']>;
  createdBy_not_contains?: InputMaybe<Scalars['String']>;
  createdBy_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdBy_not_ends_with?: InputMaybe<Scalars['String']>;
  createdBy_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdBy_not_starts_with?: InputMaybe<Scalars['String']>;
  createdBy_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy_starts_with?: InputMaybe<Scalars['String']>;
  createdBy_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_?: InputMaybe<SpecMetadata_Filter>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<BadgeSpec_Filter>>>;
  raft?: InputMaybe<Scalars['String']>;
  raft_?: InputMaybe<Raft_Filter>;
  raft_contains?: InputMaybe<Scalars['String']>;
  raft_contains_nocase?: InputMaybe<Scalars['String']>;
  raft_ends_with?: InputMaybe<Scalars['String']>;
  raft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  raft_gt?: InputMaybe<Scalars['String']>;
  raft_gte?: InputMaybe<Scalars['String']>;
  raft_in?: InputMaybe<Array<Scalars['String']>>;
  raft_lt?: InputMaybe<Scalars['String']>;
  raft_lte?: InputMaybe<Scalars['String']>;
  raft_not?: InputMaybe<Scalars['String']>;
  raft_not_contains?: InputMaybe<Scalars['String']>;
  raft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  raft_not_ends_with?: InputMaybe<Scalars['String']>;
  raft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  raft_not_in?: InputMaybe<Array<Scalars['String']>>;
  raft_not_starts_with?: InputMaybe<Scalars['String']>;
  raft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  raft_starts_with?: InputMaybe<Scalars['String']>;
  raft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  specUri?: InputMaybe<Scalars['String']>;
  specUri_contains?: InputMaybe<Scalars['String']>;
  specUri_contains_nocase?: InputMaybe<Scalars['String']>;
  specUri_ends_with?: InputMaybe<Scalars['String']>;
  specUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  specUri_gt?: InputMaybe<Scalars['String']>;
  specUri_gte?: InputMaybe<Scalars['String']>;
  specUri_in?: InputMaybe<Array<Scalars['String']>>;
  specUri_lt?: InputMaybe<Scalars['String']>;
  specUri_lte?: InputMaybe<Scalars['String']>;
  specUri_not?: InputMaybe<Scalars['String']>;
  specUri_not_contains?: InputMaybe<Scalars['String']>;
  specUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  specUri_not_ends_with?: InputMaybe<Scalars['String']>;
  specUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  specUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  specUri_not_starts_with?: InputMaybe<Scalars['String']>;
  specUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  specUri_starts_with?: InputMaybe<Scalars['String']>;
  specUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalBadgesCount?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_gt?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_gte?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_in?: InputMaybe<Array<Scalars['Int']>>;
  totalBadgesCount_lt?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_lte?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_not?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  uri?: InputMaybe<Scalars['String']>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum BadgeSpec_OrderBy {
  Badges = 'badges',
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  Id = 'id',
  Metadata = 'metadata',
  Raft = 'raft',
  SpecUri = 'specUri',
  TotalBadgesCount = 'totalBadgesCount',
  Uri = 'uri'
}

export type Badge_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Badge_Filter>>>;
  createdAt?: InputMaybe<Scalars['Int']>;
  createdAt_gt?: InputMaybe<Scalars['Int']>;
  createdAt_gte?: InputMaybe<Scalars['Int']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']>>;
  createdAt_lt?: InputMaybe<Scalars['Int']>;
  createdAt_lte?: InputMaybe<Scalars['Int']>;
  createdAt_not?: InputMaybe<Scalars['Int']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<Badge_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  spec?: InputMaybe<Scalars['String']>;
  spec_?: InputMaybe<BadgeSpec_Filter>;
  spec_contains?: InputMaybe<Scalars['String']>;
  spec_contains_nocase?: InputMaybe<Scalars['String']>;
  spec_ends_with?: InputMaybe<Scalars['String']>;
  spec_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spec_gt?: InputMaybe<Scalars['String']>;
  spec_gte?: InputMaybe<Scalars['String']>;
  spec_in?: InputMaybe<Array<Scalars['String']>>;
  spec_lt?: InputMaybe<Scalars['String']>;
  spec_lte?: InputMaybe<Scalars['String']>;
  spec_not?: InputMaybe<Scalars['String']>;
  spec_not_contains?: InputMaybe<Scalars['String']>;
  spec_not_contains_nocase?: InputMaybe<Scalars['String']>;
  spec_not_ends_with?: InputMaybe<Scalars['String']>;
  spec_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spec_not_in?: InputMaybe<Array<Scalars['String']>>;
  spec_not_starts_with?: InputMaybe<Scalars['String']>;
  spec_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spec_starts_with?: InputMaybe<Scalars['String']>;
  spec_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  statusReason?: InputMaybe<Scalars['String']>;
  statusReason_contains?: InputMaybe<Scalars['String']>;
  statusReason_contains_nocase?: InputMaybe<Scalars['String']>;
  statusReason_ends_with?: InputMaybe<Scalars['String']>;
  statusReason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  statusReason_gt?: InputMaybe<Scalars['String']>;
  statusReason_gte?: InputMaybe<Scalars['String']>;
  statusReason_in?: InputMaybe<Array<Scalars['String']>>;
  statusReason_lt?: InputMaybe<Scalars['String']>;
  statusReason_lte?: InputMaybe<Scalars['String']>;
  statusReason_not?: InputMaybe<Scalars['String']>;
  statusReason_not_contains?: InputMaybe<Scalars['String']>;
  statusReason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  statusReason_not_ends_with?: InputMaybe<Scalars['String']>;
  statusReason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  statusReason_not_in?: InputMaybe<Array<Scalars['String']>>;
  statusReason_not_starts_with?: InputMaybe<Scalars['String']>;
  statusReason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  statusReason_starts_with?: InputMaybe<Scalars['String']>;
  statusReason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  statusUpdatedAt?: InputMaybe<Scalars['Int']>;
  statusUpdatedAt_gt?: InputMaybe<Scalars['Int']>;
  statusUpdatedAt_gte?: InputMaybe<Scalars['Int']>;
  statusUpdatedAt_in?: InputMaybe<Array<Scalars['Int']>>;
  statusUpdatedAt_lt?: InputMaybe<Scalars['Int']>;
  statusUpdatedAt_lte?: InputMaybe<Scalars['Int']>;
  statusUpdatedAt_not?: InputMaybe<Scalars['Int']>;
  statusUpdatedAt_not_in?: InputMaybe<Array<Scalars['Int']>>;
  statusUpdatedBy?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_contains?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_contains_nocase?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_ends_with?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_ends_with_nocase?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_gt?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_gte?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_in?: InputMaybe<Array<Scalars['String']>>;
  statusUpdatedBy_lt?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_lte?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_not?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_not_contains?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_not_contains_nocase?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_not_ends_with?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_not_in?: InputMaybe<Array<Scalars['String']>>;
  statusUpdatedBy_not_starts_with?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_starts_with?: InputMaybe<Scalars['String']>;
  statusUpdatedBy_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_contains?: InputMaybe<Scalars['String']>;
  status_contains_nocase?: InputMaybe<Scalars['String']>;
  status_ends_with?: InputMaybe<Scalars['String']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_gt?: InputMaybe<Scalars['String']>;
  status_gte?: InputMaybe<Scalars['String']>;
  status_in?: InputMaybe<Array<Scalars['String']>>;
  status_lt?: InputMaybe<Scalars['String']>;
  status_lte?: InputMaybe<Scalars['String']>;
  status_not?: InputMaybe<Scalars['String']>;
  status_not_contains?: InputMaybe<Scalars['String']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']>;
  status_not_ends_with?: InputMaybe<Scalars['String']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_in?: InputMaybe<Array<Scalars['String']>>;
  status_not_starts_with?: InputMaybe<Scalars['String']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_starts_with?: InputMaybe<Scalars['String']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Badge_OrderBy {
  CreatedAt = 'createdAt',
  From = 'from',
  Id = 'id',
  Owner = 'owner',
  Spec = 'spec',
  Status = 'status',
  StatusReason = 'statusReason',
  StatusUpdatedAt = 'statusUpdatedAt',
  StatusUpdatedBy = 'statusUpdatedBy'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  badge?: Maybe<Badge>;
  badgeSpec?: Maybe<BadgeSpec>;
  badgeSpecs: Array<BadgeSpec>;
  badges: Array<Badge>;
  raft?: Maybe<Raft>;
  raftMetadata: Array<RaftMetadata>;
  rafts: Array<Raft>;
  specMetadata: Array<SpecMetadata>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryBadgeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBadgeSpecArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBadgeSpecsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BadgeSpec_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BadgeSpec_Filter>;
};


export type QueryBadgesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Badge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Badge_Filter>;
};


export type QueryRaftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRaftMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RaftMetadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RaftMetadata_Filter>;
};


export type QueryRaftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Raft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Raft_Filter>;
};


export type QuerySpecMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpecMetadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SpecMetadata_Filter>;
};

export type Raft = {
  __typename?: 'Raft';
  createdAt: Scalars['Int'];
  createdBy: Scalars['String'];
  id: Scalars['ID'];
  metadata?: Maybe<RaftMetadata>;
  owner: Scalars['Bytes'];
  specs: Array<BadgeSpec>;
  tokenId: Scalars['BigInt'];
  totalBadgesCount: Scalars['Int'];
  totalSpecsCount: Scalars['Int'];
  uri: Scalars['String'];
};


export type RaftSpecsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BadgeSpec_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BadgeSpec_Filter>;
};

export type RaftMetadata = {
  __typename?: 'RaftMetadata';
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type RaftMetadata_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RaftMetadata_Filter>>>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  image?: InputMaybe<Scalars['String']>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<RaftMetadata_Filter>>>;
};

export enum RaftMetadata_OrderBy {
  Description = 'description',
  Id = 'id',
  Image = 'image',
  Name = 'name'
}

export type Raft_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Raft_Filter>>>;
  createdAt?: InputMaybe<Scalars['Int']>;
  createdAt_gt?: InputMaybe<Scalars['Int']>;
  createdAt_gte?: InputMaybe<Scalars['Int']>;
  createdAt_in?: InputMaybe<Array<Scalars['Int']>>;
  createdAt_lt?: InputMaybe<Scalars['Int']>;
  createdAt_lte?: InputMaybe<Scalars['Int']>;
  createdAt_not?: InputMaybe<Scalars['Int']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['Int']>>;
  createdBy?: InputMaybe<Scalars['String']>;
  createdBy_contains?: InputMaybe<Scalars['String']>;
  createdBy_contains_nocase?: InputMaybe<Scalars['String']>;
  createdBy_ends_with?: InputMaybe<Scalars['String']>;
  createdBy_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy_gt?: InputMaybe<Scalars['String']>;
  createdBy_gte?: InputMaybe<Scalars['String']>;
  createdBy_in?: InputMaybe<Array<Scalars['String']>>;
  createdBy_lt?: InputMaybe<Scalars['String']>;
  createdBy_lte?: InputMaybe<Scalars['String']>;
  createdBy_not?: InputMaybe<Scalars['String']>;
  createdBy_not_contains?: InputMaybe<Scalars['String']>;
  createdBy_not_contains_nocase?: InputMaybe<Scalars['String']>;
  createdBy_not_ends_with?: InputMaybe<Scalars['String']>;
  createdBy_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy_not_in?: InputMaybe<Array<Scalars['String']>>;
  createdBy_not_starts_with?: InputMaybe<Scalars['String']>;
  createdBy_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdBy_starts_with?: InputMaybe<Scalars['String']>;
  createdBy_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_?: InputMaybe<RaftMetadata_Filter>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<Raft_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  specs_?: InputMaybe<BadgeSpec_Filter>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBadgesCount?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_gt?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_gte?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_in?: InputMaybe<Array<Scalars['Int']>>;
  totalBadgesCount_lt?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_lte?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_not?: InputMaybe<Scalars['Int']>;
  totalBadgesCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSpecsCount?: InputMaybe<Scalars['Int']>;
  totalSpecsCount_gt?: InputMaybe<Scalars['Int']>;
  totalSpecsCount_gte?: InputMaybe<Scalars['Int']>;
  totalSpecsCount_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSpecsCount_lt?: InputMaybe<Scalars['Int']>;
  totalSpecsCount_lte?: InputMaybe<Scalars['Int']>;
  totalSpecsCount_not?: InputMaybe<Scalars['Int']>;
  totalSpecsCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  uri?: InputMaybe<Scalars['String']>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Raft_OrderBy {
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  Id = 'id',
  Metadata = 'metadata',
  Owner = 'owner',
  Specs = 'specs',
  TokenId = 'tokenId',
  TotalBadgesCount = 'totalBadgesCount',
  TotalSpecsCount = 'totalSpecsCount',
  Uri = 'uri'
}

export type SpecMetadata = {
  __typename?: 'SpecMetadata';
  description: Scalars['String'];
  expiresAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type SpecMetadata_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SpecMetadata_Filter>>>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  expiresAt?: InputMaybe<Scalars['String']>;
  expiresAt_contains?: InputMaybe<Scalars['String']>;
  expiresAt_contains_nocase?: InputMaybe<Scalars['String']>;
  expiresAt_ends_with?: InputMaybe<Scalars['String']>;
  expiresAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  expiresAt_gt?: InputMaybe<Scalars['String']>;
  expiresAt_gte?: InputMaybe<Scalars['String']>;
  expiresAt_in?: InputMaybe<Array<Scalars['String']>>;
  expiresAt_lt?: InputMaybe<Scalars['String']>;
  expiresAt_lte?: InputMaybe<Scalars['String']>;
  expiresAt_not?: InputMaybe<Scalars['String']>;
  expiresAt_not_contains?: InputMaybe<Scalars['String']>;
  expiresAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  expiresAt_not_ends_with?: InputMaybe<Scalars['String']>;
  expiresAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  expiresAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  expiresAt_not_starts_with?: InputMaybe<Scalars['String']>;
  expiresAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  expiresAt_starts_with?: InputMaybe<Scalars['String']>;
  expiresAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  image?: InputMaybe<Scalars['String']>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<InputMaybe<SpecMetadata_Filter>>>;
};

export enum SpecMetadata_OrderBy {
  Description = 'description',
  ExpiresAt = 'expiresAt',
  Id = 'id',
  Image = 'image',
  Name = 'name'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  badge?: Maybe<Badge>;
  badgeSpec?: Maybe<BadgeSpec>;
  badgeSpecs: Array<BadgeSpec>;
  badges: Array<Badge>;
  raft?: Maybe<Raft>;
  raftMetadata: Array<RaftMetadata>;
  rafts: Array<Raft>;
  specMetadata: Array<SpecMetadata>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionBadgeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBadgeSpecArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBadgeSpecsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BadgeSpec_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BadgeSpec_Filter>;
};


export type SubscriptionBadgesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Badge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Badge_Filter>;
};


export type SubscriptionRaftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRaftMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RaftMetadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RaftMetadata_Filter>;
};


export type SubscriptionRaftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Raft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Raft_Filter>;
};


export type SubscriptionSpecMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpecMetadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SpecMetadata_Filter>;
};

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

export type GetBadgesQueryVariables = Exact<{
  raftId: Scalars['String'];
  startBlock: Scalars['Int'];
  endBlock: Scalars['Int'];
}>;


export type GetBadgesQuery = { __typename?: 'Query', badges: Array<{ __typename?: 'Badge', id: string, owner: any, createdAt: number, spec: { __typename?: 'BadgeSpec', id: string, metadata?: { __typename?: 'SpecMetadata', name: string, description: string, image: string } | null } }> };


export const GetBadgesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBadges"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"raftId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endBlock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"badges"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"spec_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"raft"},"value":{"kind":"Variable","name":{"kind":"Name","value":"raftId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"_change_block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"number_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startBlock"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"block"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endBlock"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"spec"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBadgesQuery, GetBadgesQueryVariables>;