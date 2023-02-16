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
  Date: any;
  Time: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};

/** Allow manipulating the relationship between the types 'Account' and 'OtterspaceBadge'. */
export type AccountBadgesRelation = {
  /** Create one or more documents of type 'OtterspaceBadge' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<OtterspaceBadgeInput>>>;
  /** Connect one or more documents of type 'OtterspaceBadge' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'OtterspaceBadge' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** Allow manipulating the relationship between the types 'Account' and 'Hat'. */
export type AccountHatsRelation = {
  /** Create one or more documents of type 'Hat' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<HatInput>>>;
  /** Connect one or more documents of type 'Hat' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Hat' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'Account' input values */
export type AccountInput = {
  address: Scalars['String'];
  profile?: InputMaybe<AccountProfileRelation>;
  cabinTokenBalance?: InputMaybe<Scalars['String']>;
  hats?: InputMaybe<AccountHatsRelation>;
  badges?: InputMaybe<AccountBadgesRelation>;
};

/** Allow manipulating the relationship between the types 'Account' and 'Profile' using the field 'Account.profile'. */
export type AccountProfileRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'Activity' input values */
export type ActivityInput = {
  key: Scalars['String'];
  timestamp: Scalars['Time'];
  type: ActivityType;
  profileRoleAdded?: InputMaybe<ProfileRoleType>;
  transactionId?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<ActivityProfileRelation>;
  metadata?: InputMaybe<ActivityMetadataInput>;
};

/** 'ActivityMetadata' input values */
export type ActivityMetadataInput = {
  badgeId?: InputMaybe<Scalars['String']>;
  profileRole?: InputMaybe<ProfileRoleInput>;
};

/** Allow manipulating the relationship between the types 'Activity' and 'Profile' using the field 'Activity.profile'. */
export type ActivityProfileRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'BlockSyncAttempt' input values */
export type BlockSyncAttemptInput = {
  key: Scalars['String'];
  startBlock: Scalars['String'];
  endBlock: Scalars['String'];
  failedAttemptCount?: InputMaybe<Scalars['Int']>;
  status: BlockSyncAttemptStatus;
};

/** 'Hat' input values */
export type HatInput = {
  hatId: Scalars['String'];
  details: Scalars['String'];
  imageUri?: InputMaybe<Scalars['String']>;
  level: Scalars['Int'];
  wearers?: InputMaybe<HatWearersRelation>;
};

/** Allow manipulating the relationship between the types 'Hat' and 'Account'. */
export type HatWearersRelation = {
  /** Create one or more documents of type 'Account' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<AccountInput>>>;
  /** Connect one or more documents of type 'Account' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Account' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Delete an existing document in the collection of 'Profile' */
  deleteProfile?: Maybe<Profile>;
  /** Partially updates an existing document in the collection of 'Account'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateAccount?: Maybe<Account>;
  /** Delete an existing document in the collection of 'OtterspaceBadge' */
  deleteOtterspaceBadge?: Maybe<OtterspaceBadge>;
  /** Update an existing document in the collection of 'BlockSyncAttempt' */
  updateBlockSyncAttempt?: Maybe<BlockSyncAttempt>;
  /** Create a new document in the collection of 'Activity' */
  createActivity: Activity;
  /** Delete an existing document in the collection of 'Hat' */
  deleteHat?: Maybe<Hat>;
  /** Partially updates an existing document in the collection of 'Activity'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateActivity?: Maybe<Activity>;
  /** Partially updates an existing document in the collection of 'OtterspaceBadgeSpec'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateOtterspaceBadgeSpec?: Maybe<OtterspaceBadgeSpec>;
  /** Update an existing document in the collection of 'OtterspaceBadge' */
  updateOtterspaceBadge?: Maybe<OtterspaceBadge>;
  /** Create a new document in the collection of 'OtterspaceBadge' */
  createOtterspaceBadge: OtterspaceBadge;
  /** Delete an existing document in the collection of 'Account' */
  deleteAccount?: Maybe<Account>;
  /** Update an existing document in the collection of 'OtterspaceBadgeSpec' */
  updateOtterspaceBadgeSpec?: Maybe<OtterspaceBadgeSpec>;
  /** Partially updates an existing document in the collection of 'BlockSyncAttempt'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateBlockSyncAttempt?: Maybe<BlockSyncAttempt>;
  /** Update an existing document in the collection of 'Account' */
  updateAccount?: Maybe<Account>;
  /** Update an existing document in the collection of 'Hat' */
  updateHat?: Maybe<Hat>;
  /** Partially updates an existing document in the collection of 'Profile'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateProfile?: Maybe<Profile>;
  /** Update an existing document in the collection of 'Activity' */
  updateActivity?: Maybe<Activity>;
  /** Partially updates an existing document in the collection of 'Hat'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateHat?: Maybe<Hat>;
  /** Create a new document in the collection of 'BlockSyncAttempt' */
  createBlockSyncAttempt: BlockSyncAttempt;
  clearSyncAttempts: Scalars['Boolean'];
  createProfile: Profile;
  /** Create a new document in the collection of 'OtterspaceBadgeSpec' */
  createOtterspaceBadgeSpec: OtterspaceBadgeSpec;
  /** Delete an existing document in the collection of 'OtterspaceBadgeSpec' */
  deleteOtterspaceBadgeSpec?: Maybe<OtterspaceBadgeSpec>;
  /** Create a new document in the collection of 'Account' */
  createAccount: Account;
  /** Partially updates an existing document in the collection of 'OtterspaceBadge'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateOtterspaceBadge?: Maybe<OtterspaceBadge>;
  /** Create a new document in the collection of 'Hat' */
  createHat: Hat;
  /** Delete an existing document in the collection of 'BlockSyncAttempt' */
  deleteBlockSyncAttempt?: Maybe<BlockSyncAttempt>;
  /** Update an existing document in the collection of 'Profile' */
  updateProfile?: Maybe<Profile>;
  /** Delete an existing document in the collection of 'Activity' */
  deleteActivity?: Maybe<Activity>;
};


export type MutationDeleteProfileArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateAccountArgs = {
  id: Scalars['ID'];
  data: PartialUpdateAccountInput;
};


export type MutationDeleteOtterspaceBadgeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateBlockSyncAttemptArgs = {
  id: Scalars['ID'];
  data: BlockSyncAttemptInput;
};


export type MutationCreateActivityArgs = {
  data: ActivityInput;
};


export type MutationDeleteHatArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateActivityArgs = {
  id: Scalars['ID'];
  data: PartialUpdateActivityInput;
};


export type MutationPartialUpdateOtterspaceBadgeSpecArgs = {
  id: Scalars['ID'];
  data: PartialUpdateOtterspaceBadgeSpecInput;
};


export type MutationUpdateOtterspaceBadgeArgs = {
  id: Scalars['ID'];
  data: OtterspaceBadgeInput;
};


export type MutationCreateOtterspaceBadgeArgs = {
  data: OtterspaceBadgeInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateOtterspaceBadgeSpecArgs = {
  id: Scalars['ID'];
  data: OtterspaceBadgeSpecInput;
};


export type MutationPartialUpdateBlockSyncAttemptArgs = {
  id: Scalars['ID'];
  data: PartialUpdateBlockSyncAttemptInput;
};


export type MutationUpdateAccountArgs = {
  id: Scalars['ID'];
  data: AccountInput;
};


export type MutationUpdateHatArgs = {
  id: Scalars['ID'];
  data: HatInput;
};


export type MutationPartialUpdateProfileArgs = {
  id: Scalars['ID'];
  data: PartialUpdateProfileInput;
};


export type MutationUpdateActivityArgs = {
  id: Scalars['ID'];
  data: ActivityInput;
};


export type MutationPartialUpdateHatArgs = {
  id: Scalars['ID'];
  data: PartialUpdateHatInput;
};


export type MutationCreateBlockSyncAttemptArgs = {
  data: BlockSyncAttemptInput;
};


export type MutationClearSyncAttemptsArgs = {
  key: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  data: ProfileInput;
};


export type MutationCreateOtterspaceBadgeSpecArgs = {
  data: OtterspaceBadgeSpecInput;
};


export type MutationDeleteOtterspaceBadgeSpecArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAccountArgs = {
  data: AccountInput;
};


export type MutationPartialUpdateOtterspaceBadgeArgs = {
  id: Scalars['ID'];
  data: PartialUpdateOtterspaceBadgeInput;
};


export type MutationCreateHatArgs = {
  data: HatInput;
};


export type MutationDeleteBlockSyncAttemptArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  id: Scalars['ID'];
  data: ProfileInput;
};


export type MutationDeleteActivityArgs = {
  id: Scalars['ID'];
};

/** Allow manipulating the relationship between the types 'OtterspaceBadge' and 'Account' using the field 'OtterspaceBadge.account'. */
export type OtterspaceBadgeAccountRelation = {
  /** Create a document of type 'Account' and associate it with the current document. */
  create?: InputMaybe<AccountInput>;
  /** Connect a document of type 'Account' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'OtterspaceBadge' input values */
export type OtterspaceBadgeInput = {
  badgeId: Scalars['String'];
  account?: InputMaybe<OtterspaceBadgeAccountRelation>;
  spec?: InputMaybe<OtterspaceBadgeSpecRelation>;
};

/** Allow manipulating the relationship between the types 'OtterspaceBadgeSpec' and 'OtterspaceBadge'. */
export type OtterspaceBadgeSpecBadgesRelation = {
  /** Create one or more documents of type 'OtterspaceBadge' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<OtterspaceBadgeInput>>>;
  /** Connect one or more documents of type 'OtterspaceBadge' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'OtterspaceBadge' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'OtterspaceBadgeSpec' input values */
export type OtterspaceBadgeSpecInput = {
  specId: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  badges?: InputMaybe<OtterspaceBadgeSpecBadgesRelation>;
};

/** Allow manipulating the relationship between the types 'OtterspaceBadge' and 'OtterspaceBadgeSpec' using the field 'OtterspaceBadge.spec'. */
export type OtterspaceBadgeSpecRelation = {
  /** Create a document of type 'OtterspaceBadgeSpec' and associate it with the current document. */
  create?: InputMaybe<OtterspaceBadgeSpecInput>;
  /** Connect a document of type 'OtterspaceBadgeSpec' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'Account' input values */
export type PartialUpdateAccountInput = {
  address?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<AccountProfileRelation>;
  cabinTokenBalance?: InputMaybe<Scalars['String']>;
  hats?: InputMaybe<AccountHatsRelation>;
  badges?: InputMaybe<AccountBadgesRelation>;
};

/** 'Activity' input values */
export type PartialUpdateActivityInput = {
  key?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Time']>;
  type?: InputMaybe<ActivityType>;
  profileRoleAdded?: InputMaybe<ProfileRoleType>;
  transactionId?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<ActivityProfileRelation>;
  metadata?: InputMaybe<PartialUpdateActivityMetadataInput>;
};

/** 'ActivityMetadata' input values */
export type PartialUpdateActivityMetadataInput = {
  badgeId?: InputMaybe<Scalars['String']>;
  profileRole?: InputMaybe<PartialUpdateProfileRoleInput>;
};

/** 'BlockSyncAttempt' input values */
export type PartialUpdateBlockSyncAttemptInput = {
  key?: InputMaybe<Scalars['String']>;
  startBlock?: InputMaybe<Scalars['String']>;
  endBlock?: InputMaybe<Scalars['String']>;
  failedAttemptCount?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<BlockSyncAttemptStatus>;
};

/** 'Hat' input values */
export type PartialUpdateHatInput = {
  hatId?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  imageUri?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
  wearers?: InputMaybe<HatWearersRelation>;
};

/** 'OtterspaceBadge' input values */
export type PartialUpdateOtterspaceBadgeInput = {
  badgeId?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<OtterspaceBadgeAccountRelation>;
  spec?: InputMaybe<OtterspaceBadgeSpecRelation>;
};

/** 'OtterspaceBadgeSpec' input values */
export type PartialUpdateOtterspaceBadgeSpecInput = {
  specId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  badges?: InputMaybe<OtterspaceBadgeSpecBadgesRelation>;
};

/** 'ProfileContactField' input values */
export type PartialUpdateProfileContactFieldInput = {
  type?: InputMaybe<ProfileContactFieldType>;
  value?: InputMaybe<Scalars['String']>;
};

/** 'Profile' input values */
export type PartialUpdateProfileInput = {
  createdAt?: InputMaybe<Scalars['Time']>;
  name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<PartialUpdateProfileRoleInput>>;
  citizenshipStatus?: InputMaybe<CitizenshipStatus>;
  contactFields?: InputMaybe<Array<PartialUpdateProfileContactFieldInput>>;
  account?: InputMaybe<ProfileAccountRelation>;
};

/** 'ProfileRole' input values */
export type PartialUpdateProfileRoleInput = {
  hatId?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<ProfileRoleType>;
  level?: InputMaybe<ProfileRoleLevelType>;
};

/** Allow manipulating the relationship between the types 'Profile' and 'Account' using the field 'Profile.account'. */
export type ProfileAccountRelation = {
  /** Create a document of type 'Account' and associate it with the current document. */
  create?: InputMaybe<AccountInput>;
  /** Connect a document of type 'Account' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** If true, disconnects this document from 'Account' */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** 'ProfileContactField' input values */
export type ProfileContactFieldInput = {
  type: ProfileContactFieldType;
  value: Scalars['String'];
};

export type ProfileInput = {
  address: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
};

/** 'ProfileRole' input values */
export type ProfileRoleInput = {
  hatId?: InputMaybe<Scalars['String']>;
  role: ProfileRoleType;
  level: ProfileRoleLevelType;
};

export type Account = {
  __typename?: 'Account';
  cabinTokenBalance?: Maybe<Scalars['String']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  profile?: Maybe<Profile>;
  address: Scalars['String'];
  hats: HatPage;
  badges: OtterspaceBadgePage;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type AccountHatsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type AccountBadgesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Account'. */
export type AccountPage = {
  __typename?: 'AccountPage';
  /** The elements of type 'Account' in this page. */
  data: Array<Maybe<Account>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Activity = {
  __typename?: 'Activity';
  timestamp: Scalars['Time'];
  /** The document's ID. */
  _id: Scalars['ID'];
  profileRoleAdded?: Maybe<ProfileRoleType>;
  key: Scalars['String'];
  profile: Profile;
  metadata?: Maybe<ActivityMetadata>;
  type: ActivityType;
  transactionId?: Maybe<Scalars['String']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

export type ActivityMetadata = {
  __typename?: 'ActivityMetadata';
  badgeId?: Maybe<Scalars['String']>;
  profileRole?: Maybe<ProfileRole>;
};

export enum ActivityType {
  ProfileCreated = 'ProfileCreated',
  ProfileRoleAdded = 'ProfileRoleAdded',
  ProfileBadgeAdded = 'ProfileBadgeAdded'
}

export type BlockSyncAttempt = {
  __typename?: 'BlockSyncAttempt';
  /** The document's ID. */
  _id: Scalars['ID'];
  failedAttemptCount?: Maybe<Scalars['Int']>;
  key: Scalars['String'];
  status: BlockSyncAttemptStatus;
  endBlock: Scalars['String'];
  startBlock: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'BlockSyncAttempt'. */
export type BlockSyncAttemptPage = {
  __typename?: 'BlockSyncAttemptPage';
  /** The elements of type 'BlockSyncAttempt' in this page. */
  data: Array<Maybe<BlockSyncAttempt>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export enum BlockSyncAttemptStatus {
  Pending = 'Pending',
  Successful = 'Successful',
  Failed = 'Failed'
}

export enum CitizenshipStatus {
  VouchRequested = 'VouchRequested',
  Vouched = 'Vouched',
  Verified = 'Verified'
}

export type Hat = {
  __typename?: 'Hat';
  /** The document's ID. */
  _id: Scalars['ID'];
  imageUri?: Maybe<Scalars['String']>;
  hatId: Scalars['String'];
  wearers: AccountPage;
  details: Scalars['String'];
  level: Scalars['Int'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type HatWearersArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Hat'. */
export type HatPage = {
  __typename?: 'HatPage';
  /** The elements of type 'Hat' in this page. */
  data: Array<Maybe<Hat>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type OtterspaceBadge = {
  __typename?: 'OtterspaceBadge';
  /** The document's ID. */
  _id: Scalars['ID'];
  spec: OtterspaceBadgeSpec;
  badgeId: Scalars['String'];
  account: Account;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'OtterspaceBadge'. */
export type OtterspaceBadgePage = {
  __typename?: 'OtterspaceBadgePage';
  /** The elements of type 'OtterspaceBadge' in this page. */
  data: Array<Maybe<OtterspaceBadge>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type OtterspaceBadgeSpec = {
  __typename?: 'OtterspaceBadgeSpec';
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  specId: Scalars['String'];
  badges: OtterspaceBadgePage;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type OtterspaceBadgeSpecBadgesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  name: Scalars['String'];
  email: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  bio?: Maybe<Scalars['String']>;
  citizenshipStatus?: Maybe<CitizenshipStatus>;
  roles: Array<ProfileRole>;
  createdAt: Scalars['Time'];
  account: Account;
  contactFields: Array<ProfileContactField>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

export type ProfileContactField = {
  __typename?: 'ProfileContactField';
  type: ProfileContactFieldType;
  value: Scalars['String'];
};

export enum ProfileContactFieldType {
  Email = 'Email',
  Twitter = 'Twitter',
  Discord = 'Discord',
  Telegram = 'Telegram',
  Github = 'Github',
  Website = 'Website',
  Other = 'Other'
}

export type ProfileRole = {
  __typename?: 'ProfileRole';
  hatId?: Maybe<Scalars['String']>;
  role: ProfileRoleType;
  level: ProfileRoleLevelType;
};

export enum ProfileRoleLevelType {
  Apprentice = 'Apprentice',
  Member = 'Member',
  TopHat = 'TopHat'
}

export enum ProfileRoleType {
  Caretaker = 'Caretaker',
  Builder = 'Builder',
  Gatherer = 'Gatherer',
  Naturalist = 'Naturalist',
  Creator = 'Creator',
  Resident = 'Resident'
}

export type Query = {
  __typename?: 'Query';
  /** Find a document from the collection of 'OtterspaceBadge' by its id. */
  findOtterspaceBadgeByID?: Maybe<OtterspaceBadge>;
  /** Find a document from the collection of 'Profile' by its id. */
  findProfileByID?: Maybe<Profile>;
  /** Find a document from the collection of 'BlockSyncAttempt' by its id. */
  findBlockSyncAttemptByID?: Maybe<BlockSyncAttempt>;
  accountByAddress?: Maybe<Account>;
  /** Find a document from the collection of 'Activity' by its id. */
  findActivityByID?: Maybe<Activity>;
  /** Find a document from the collection of 'Hat' by its id. */
  findHatByID?: Maybe<Hat>;
  syncAttemptByKeyAndStatus?: Maybe<BlockSyncAttempt>;
  syncAttemptsByKey: BlockSyncAttemptPage;
  /** Find a document from the collection of 'OtterspaceBadgeSpec' by its id. */
  findOtterspaceBadgeSpecByID?: Maybe<OtterspaceBadgeSpec>;
  allActivities: QueryAllActivitiesPage;
  allAccounts: AccountPage;
  /** Find a document from the collection of 'Account' by its id. */
  findAccountByID?: Maybe<Account>;
  allHats: HatPage;
};


export type QueryFindOtterspaceBadgeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindProfileByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindBlockSyncAttemptByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAccountByAddressArgs = {
  address: Scalars['String'];
};


export type QueryFindActivityByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindHatByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySyncAttemptByKeyAndStatusArgs = {
  key: Scalars['String'];
  status: BlockSyncAttemptStatus;
};


export type QuerySyncAttemptsByKeyArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
};


export type QueryFindOtterspaceBadgeSpecByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllActivitiesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryAllAccountsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryFindAccountByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllHatsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Activity'. */
export type QueryAllActivitiesPage = {
  __typename?: 'QueryAllActivitiesPage';
  /** The elements of type 'Activity' in this page. */
  data: Array<Maybe<Activity>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};
