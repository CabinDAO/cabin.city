import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  text?: InputMaybe<Scalars['String']>;
  timestamp: Scalars['Time'];
  type: ActivityType;
  profileRoleAdded?: InputMaybe<ProfileRoleType>;
  transactionId?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<ActivityProfileRelation>;
  metadata?: InputMaybe<ActivityMetadataInput>;
  reactions?: InputMaybe<ActivityReactionsRelation>;
  reactedByProfile?: InputMaybe<Scalars['Boolean']>;
};

/** Allow manipulating the relationship between the types 'ActivityItem' and 'Activity' using the field 'ActivityItem.activity'. */
export type ActivityItemActivityRelation = {
  /** Create a document of type 'Activity' and associate it with the current document. */
  create?: InputMaybe<ActivityInput>;
  /** Connect a document of type 'Activity' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'ActivityItem' input values */
export type ActivityItemInput = {
  activity: Scalars['ID'];
  reactionCount: Scalars['Int'];
  hasReactionByMe: Scalars['Boolean'];
};

/** Allow manipulating the relationship between the types 'ActivityMetadata' and 'OtterspaceBadge' using the field 'ActivityMetadata.badge'. */
export type ActivityMetadataBadgeRelation = {
  /** Create a document of type 'OtterspaceBadge' and associate it with the current document. */
  create?: InputMaybe<OtterspaceBadgeInput>;
  /** Connect a document of type 'OtterspaceBadge' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
  /** If true, disconnects this document from 'OtterspaceBadge' */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** 'ActivityMetadata' input values */
export type ActivityMetadataInput = {
  badge?: InputMaybe<Scalars['ID']>;
  profileRole?: InputMaybe<ProfileRoleInput>;
  citizenshipTokenId?: InputMaybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Activity' and 'Profile' using the field 'Activity.profile'. */
export type ActivityProfileRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'ActivityReaction' and 'Activity' using the field 'ActivityReaction.activity'. */
export type ActivityReactionActivityRelation = {
  /** Create a document of type 'Activity' and associate it with the current document. */
  create?: InputMaybe<ActivityInput>;
  /** Connect a document of type 'Activity' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'ActivityReaction' input values */
export type ActivityReactionInput = {
  profile?: InputMaybe<ActivityReactionProfileRelation>;
  activity?: InputMaybe<ActivityReactionActivityRelation>;
};

/** Allow manipulating the relationship between the types 'ActivityReaction' and 'Profile' using the field 'ActivityReaction.profile'. */
export type ActivityReactionProfileRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'Activity' and 'ActivityReaction'. */
export type ActivityReactionsRelation = {
  /** Create one or more documents of type 'ActivityReaction' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<ActivityReactionInput>>>;
  /** Connect one or more documents of type 'ActivityReaction' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'ActivityReaction' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'BlockSyncAttempt' input values */
export type BlockSyncAttemptInput = {
  key: Scalars['String'];
  startBlock: Scalars['String'];
  endBlock: Scalars['String'];
  failedAttemptCount?: InputMaybe<Scalars['Int']>;
  status: BlockSyncAttemptStatus;
};

/** 'CitizenshipMetadata' input values */
export type CitizenshipMetadataInput = {
  tokenId: Scalars['String'];
  mintedAt: Scalars['Time'];
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

/** 'LocationAddress' input values */
export type LocationAddressInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  formattedAddress?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  route?: InputMaybe<Scalars['String']>;
  routeShort?: InputMaybe<Scalars['String']>;
  locality?: InputMaybe<Scalars['String']>;
  admininstrativeAreaLevel1?: InputMaybe<Scalars['String']>;
  admininstrativeAreaLevel1Short?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  countryShort?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Location' and 'Profile' using the field 'Location.caretaker'. */
export type LocationCaretakerRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'Location' input values */
export type LocationInput = {
  locationType?: InputMaybe<LocationType>;
  name?: InputMaybe<Scalars['String']>;
  tagline?: InputMaybe<Scalars['String']>;
  sleepCapacity?: InputMaybe<Scalars['Int']>;
  caretaker?: InputMaybe<LocationCaretakerRelation>;
  caretakerEmail?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['Time']>;
  offers?: InputMaybe<LocationOffersRelation>;
  offerCount?: InputMaybe<Scalars['Int']>;
  mediaItems?: InputMaybe<LocationMediaItemsRelation>;
  votes?: InputMaybe<LocationVotesRelation>;
  voteCount?: InputMaybe<Scalars['Int']>;
  internetSpeedMbps?: InputMaybe<Scalars['Int']>;
  address?: InputMaybe<LocationAddressInput>;
  bannerImageIpfsHash?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  addressInfo?: InputMaybe<Scalars['String']>;
};

/** 'LocationMediaItem' input values */
export type LocationMediaItemInput = {
  location?: InputMaybe<LocationMediaItemLocationRelation>;
  category: LocationMediaCategory;
  imageIpfsHash?: InputMaybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'LocationMediaItem' and 'Location' using the field 'LocationMediaItem.location'. */
export type LocationMediaItemLocationRelation = {
  /** Create a document of type 'Location' and associate it with the current document. */
  create?: InputMaybe<LocationInput>;
  /** Connect a document of type 'Location' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'Location' and 'LocationMediaItem'. */
export type LocationMediaItemsRelation = {
  /** Create one or more documents of type 'LocationMediaItem' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<LocationMediaItemInput>>>;
  /** Connect one or more documents of type 'LocationMediaItem' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'LocationMediaItem' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** Allow manipulating the relationship between the types 'Location' and 'Offer'. */
export type LocationOffersRelation = {
  /** Create one or more documents of type 'Offer' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<OfferInput>>>;
  /** Connect one or more documents of type 'Offer' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Offer' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'LocationVote' input values */
export type LocationVoteInput = {
  location?: InputMaybe<LocationVoteLocationRelation>;
  profile?: InputMaybe<LocationVoteProfileRelation>;
  count: Scalars['Int'];
};

/** Allow manipulating the relationship between the types 'LocationVote' and 'Location' using the field 'LocationVote.location'. */
export type LocationVoteLocationRelation = {
  /** Create a document of type 'Location' and associate it with the current document. */
  create?: InputMaybe<LocationInput>;
  /** Connect a document of type 'Location' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'LocationVote' and 'Profile' using the field 'LocationVote.profile'. */
export type LocationVoteProfileRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'Location' and 'LocationVote'. */
export type LocationVotesRelation = {
  /** Create one or more documents of type 'LocationVote' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<LocationVoteInput>>>;
  /** Connect one or more documents of type 'LocationVote' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'LocationVote' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Delete an existing document in the collection of 'Profile' */
  deleteProfile?: Maybe<Profile>;
  /** Partially updates an existing document in the collection of 'Account'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateAccount?: Maybe<Account>;
  /** Partially updates an existing document in the collection of 'Offer'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateOffer?: Maybe<Offer>;
  /** Delete an existing document in the collection of 'OtterspaceBadge' */
  deleteOtterspaceBadge?: Maybe<OtterspaceBadge>;
  /** Update an existing document in the collection of 'BlockSyncAttempt' */
  updateBlockSyncAttempt?: Maybe<BlockSyncAttempt>;
  /** Create a new document in the collection of 'Activity' */
  createActivity: Activity;
  /** Update an existing document in the collection of 'ProfileVouch' */
  updateProfileVouch?: Maybe<ProfileVouch>;
  /** Delete an existing document in the collection of 'Hat' */
  deleteHat?: Maybe<Hat>;
  unvouchProfile: Profile;
  /** Partially updates an existing document in the collection of 'Activity'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateActivity?: Maybe<Activity>;
  /** Delete an existing document in the collection of 'Location' */
  deleteLocation?: Maybe<Location>;
  /** Update an existing document in the collection of 'LocationVote' */
  updateLocationVote?: Maybe<LocationVote>;
  /** Create a new document in the collection of 'ActivityReaction' */
  createActivityReaction: ActivityReaction;
  /** Partially updates an existing document in the collection of 'Location'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateLocation?: Maybe<Location>;
  /** Delete an existing document in the collection of 'TrackingEvent' */
  deleteTrackingEvent?: Maybe<TrackingEvent>;
  /** Partially updates an existing document in the collection of 'OtterspaceBadgeSpec'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateOtterspaceBadgeSpec?: Maybe<OtterspaceBadgeSpec>;
  /** Update an existing document in the collection of 'OtterspaceBadge' */
  updateOtterspaceBadge?: Maybe<OtterspaceBadge>;
  /** Partially updates an existing document in the collection of 'TrackingEvent'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateTrackingEvent?: Maybe<TrackingEvent>;
  /** Create a new document in the collection of 'OtterspaceBadge' */
  createOtterspaceBadge: OtterspaceBadge;
  /** Delete an existing document in the collection of 'Account' */
  deleteAccount?: Maybe<Account>;
  /** Update an existing document in the collection of 'ActivityReaction' */
  updateActivityReaction?: Maybe<ActivityReaction>;
  /** Update an existing document in the collection of 'OtterspaceBadgeSpec' */
  updateOtterspaceBadgeSpec?: Maybe<OtterspaceBadgeSpec>;
  /** Partially updates an existing document in the collection of 'LocationVote'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateLocationVote?: Maybe<LocationVote>;
  /** Delete an existing document in the collection of 'ActivityReaction' */
  deleteActivityReaction?: Maybe<ActivityReaction>;
  /** Partially updates an existing document in the collection of 'ActivityReaction'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateActivityReaction?: Maybe<ActivityReaction>;
  /** Delete an existing document in the collection of 'ProfileVouch' */
  deleteProfileVouch?: Maybe<ProfileVouch>;
  /** Partially updates an existing document in the collection of 'BlockSyncAttempt'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateBlockSyncAttempt?: Maybe<BlockSyncAttempt>;
  /** Create a new document in the collection of 'LocationVote' */
  createLocationVote: LocationVote;
  /** Update an existing document in the collection of 'Location' */
  updateLocation?: Maybe<Location>;
  /** Create a new document in the collection of 'LocationMediaItem' */
  createLocationMediaItem: LocationMediaItem;
  /** Create a new document in the collection of 'TrackingEvent' */
  createTrackingEvent: TrackingEvent;
  /** Delete an existing document in the collection of 'LocationMediaItem' */
  deleteLocationMediaItem?: Maybe<LocationMediaItem>;
  createLocation?: Maybe<Location>;
  unlikeActivity: ActivityReaction;
  /** Update an existing document in the collection of 'TrackingEvent' */
  updateTrackingEvent?: Maybe<TrackingEvent>;
  /** Update an existing document in the collection of 'Account' */
  updateAccount?: Maybe<Account>;
  /** Update an existing document in the collection of 'Hat' */
  updateHat?: Maybe<Hat>;
  /** Partially updates an existing document in the collection of 'Profile'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateProfile?: Maybe<Profile>;
  /** Partially updates an existing document in the collection of 'ProfileVouch'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateProfileVouch?: Maybe<ProfileVouch>;
  /** Update an existing document in the collection of 'Activity' */
  updateActivity?: Maybe<Activity>;
  /** Partially updates an existing document in the collection of 'Hat'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateHat?: Maybe<Hat>;
  /** Create a new document in the collection of 'BlockSyncAttempt' */
  createBlockSyncAttempt: BlockSyncAttempt;
  /** Create a new document in the collection of 'Offer' */
  createOffer: Offer;
  /** Update an existing document in the collection of 'LocationMediaItem' */
  updateLocationMediaItem?: Maybe<LocationMediaItem>;
  createTextActivity: Activity;
  /** Update an existing document in the collection of 'Offer' */
  updateOffer?: Maybe<Offer>;
  clearSyncAttempts: Scalars['Boolean'];
  createProfile: Profile;
  /** Create a new document in the collection of 'OtterspaceBadgeSpec' */
  createOtterspaceBadgeSpec: OtterspaceBadgeSpec;
  /** Delete an existing document in the collection of 'OtterspaceBadgeSpec' */
  deleteOtterspaceBadgeSpec?: Maybe<OtterspaceBadgeSpec>;
  /** Delete an existing document in the collection of 'LocationVote' */
  deleteLocationVote?: Maybe<LocationVote>;
  /** Create a new document in the collection of 'Account' */
  createAccount: Account;
  /** Partially updates an existing document in the collection of 'OtterspaceBadge'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateOtterspaceBadge?: Maybe<OtterspaceBadge>;
  /** Create a new document in the collection of 'Hat' */
  createHat: Hat;
  /** Partially updates an existing document in the collection of 'LocationMediaItem'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateLocationMediaItem?: Maybe<LocationMediaItem>;
  likeActivity: ActivityReaction;
  /** Delete an existing document in the collection of 'BlockSyncAttempt' */
  deleteBlockSyncAttempt?: Maybe<BlockSyncAttempt>;
  vouchProfile: Profile;
  updateProfile: Profile;
  /** Create a new document in the collection of 'ProfileVouch' */
  createProfileVouch: ProfileVouch;
  /** Delete an existing document in the collection of 'Offer' */
  deleteOffer?: Maybe<Offer>;
  logTrackingEvent: TrackingEvent;
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


export type MutationPartialUpdateOfferArgs = {
  id: Scalars['ID'];
  data: PartialUpdateOfferInput;
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


export type MutationUpdateProfileVouchArgs = {
  id: Scalars['ID'];
  data: ProfileVouchInput;
};


export type MutationDeleteHatArgs = {
  id: Scalars['ID'];
};


export type MutationUnvouchProfileArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateActivityArgs = {
  id: Scalars['ID'];
  data: PartialUpdateActivityInput;
};


export type MutationDeleteLocationArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateLocationVoteArgs = {
  id: Scalars['ID'];
  data: LocationVoteInput;
};


export type MutationCreateActivityReactionArgs = {
  data: ActivityReactionInput;
};


export type MutationPartialUpdateLocationArgs = {
  id: Scalars['ID'];
  data: PartialUpdateLocationInput;
};


export type MutationDeleteTrackingEventArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateOtterspaceBadgeSpecArgs = {
  id: Scalars['ID'];
  data: PartialUpdateOtterspaceBadgeSpecInput;
};


export type MutationUpdateOtterspaceBadgeArgs = {
  id: Scalars['ID'];
  data: OtterspaceBadgeInput;
};


export type MutationPartialUpdateTrackingEventArgs = {
  id: Scalars['ID'];
  data: PartialUpdateTrackingEventInput;
};


export type MutationCreateOtterspaceBadgeArgs = {
  data: OtterspaceBadgeInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateActivityReactionArgs = {
  id: Scalars['ID'];
  data: ActivityReactionInput;
};


export type MutationUpdateOtterspaceBadgeSpecArgs = {
  id: Scalars['ID'];
  data: OtterspaceBadgeSpecInput;
};


export type MutationPartialUpdateLocationVoteArgs = {
  id: Scalars['ID'];
  data: PartialUpdateLocationVoteInput;
};


export type MutationDeleteActivityReactionArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateActivityReactionArgs = {
  id: Scalars['ID'];
  data: PartialUpdateActivityReactionInput;
};


export type MutationDeleteProfileVouchArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateBlockSyncAttemptArgs = {
  id: Scalars['ID'];
  data: PartialUpdateBlockSyncAttemptInput;
};


export type MutationCreateLocationVoteArgs = {
  data: LocationVoteInput;
};


export type MutationUpdateLocationArgs = {
  id: Scalars['ID'];
  data: LocationInput;
};


export type MutationCreateLocationMediaItemArgs = {
  data: LocationMediaItemInput;
};


export type MutationCreateTrackingEventArgs = {
  data: TrackingEventInput;
};


export type MutationDeleteLocationMediaItemArgs = {
  id: Scalars['ID'];
};


export type MutationUnlikeActivityArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTrackingEventArgs = {
  id: Scalars['ID'];
  data: TrackingEventInput;
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


export type MutationPartialUpdateProfileVouchArgs = {
  id: Scalars['ID'];
  data: PartialUpdateProfileVouchInput;
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


export type MutationCreateOfferArgs = {
  data: OfferInput;
};


export type MutationUpdateLocationMediaItemArgs = {
  id: Scalars['ID'];
  data: LocationMediaItemInput;
};


export type MutationCreateTextActivityArgs = {
  text: Scalars['String'];
};


export type MutationUpdateOfferArgs = {
  id: Scalars['ID'];
  data: OfferInput;
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


export type MutationDeleteLocationVoteArgs = {
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


export type MutationPartialUpdateLocationMediaItemArgs = {
  id: Scalars['ID'];
  data: PartialUpdateLocationMediaItemInput;
};


export type MutationLikeActivityArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteBlockSyncAttemptArgs = {
  id: Scalars['ID'];
};


export type MutationVouchProfileArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  id: Scalars['ID'];
  data?: InputMaybe<UpdateProfileInput>;
  roleTypes?: InputMaybe<Array<ProfileRoleType>>;
};


export type MutationCreateProfileVouchArgs = {
  data: ProfileVouchInput;
};


export type MutationDeleteOfferArgs = {
  id: Scalars['ID'];
};


export type MutationLogTrackingEventArgs = {
  key: Scalars['String'];
};


export type MutationDeleteActivityArgs = {
  id: Scalars['ID'];
};

/** 'Offer' input values */
export type OfferInput = {
  offerType?: InputMaybe<OfferType>;
  title?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Time']>;
  endDate?: InputMaybe<Scalars['Time']>;
  location?: InputMaybe<OfferLocationRelation>;
  locationType: LocationType;
  price?: InputMaybe<OfferPriceInput>;
  profileRoleConstraints?: InputMaybe<Array<ProfileRoleConstraintInput>>;
  applicationUrl?: InputMaybe<Scalars['String']>;
  imageIpfsHash?: InputMaybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Offer' and 'Location' using the field 'Offer.location'. */
export type OfferLocationRelation = {
  /** Create a document of type 'Location' and associate it with the current document. */
  create?: InputMaybe<LocationInput>;
  /** Connect a document of type 'Location' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'OfferPrice' input values */
export type OfferPriceInput = {
  unit: OfferPriceUnit;
  amountCents: Scalars['Int'];
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
  createdAt: Scalars['Time'];
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
  text?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Time']>;
  type?: InputMaybe<ActivityType>;
  profileRoleAdded?: InputMaybe<ProfileRoleType>;
  transactionId?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<ActivityProfileRelation>;
  metadata?: InputMaybe<PartialUpdateActivityMetadataInput>;
  reactions?: InputMaybe<ActivityReactionsRelation>;
  reactedByProfile?: InputMaybe<Scalars['Boolean']>;
};

/** 'ActivityItem' input values */
export type PartialUpdateActivityItemInput = {
  activity?: InputMaybe<Scalars['ID']>;
  reactionCount?: InputMaybe<Scalars['Int']>;
  hasReactionByMe?: InputMaybe<Scalars['Boolean']>;
};

/** 'ActivityMetadata' input values */
export type PartialUpdateActivityMetadataInput = {
  badge?: InputMaybe<Scalars['ID']>;
  profileRole?: InputMaybe<PartialUpdateProfileRoleInput>;
  citizenshipTokenId?: InputMaybe<Scalars['String']>;
};

/** 'ActivityReaction' input values */
export type PartialUpdateActivityReactionInput = {
  profile?: InputMaybe<ActivityReactionProfileRelation>;
  activity?: InputMaybe<ActivityReactionActivityRelation>;
};

/** 'BlockSyncAttempt' input values */
export type PartialUpdateBlockSyncAttemptInput = {
  key?: InputMaybe<Scalars['String']>;
  startBlock?: InputMaybe<Scalars['String']>;
  endBlock?: InputMaybe<Scalars['String']>;
  failedAttemptCount?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<BlockSyncAttemptStatus>;
};

/** 'CitizenshipMetadata' input values */
export type PartialUpdateCitizenshipMetadataInput = {
  tokenId?: InputMaybe<Scalars['String']>;
  mintedAt?: InputMaybe<Scalars['Time']>;
};

/** 'Hat' input values */
export type PartialUpdateHatInput = {
  hatId?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  imageUri?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
  wearers?: InputMaybe<HatWearersRelation>;
};

/** 'LocationAddress' input values */
export type PartialUpdateLocationAddressInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  formattedAddress?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  route?: InputMaybe<Scalars['String']>;
  routeShort?: InputMaybe<Scalars['String']>;
  locality?: InputMaybe<Scalars['String']>;
  admininstrativeAreaLevel1?: InputMaybe<Scalars['String']>;
  admininstrativeAreaLevel1Short?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  countryShort?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
};

/** 'Location' input values */
export type PartialUpdateLocationInput = {
  locationType?: InputMaybe<LocationType>;
  name?: InputMaybe<Scalars['String']>;
  tagline?: InputMaybe<Scalars['String']>;
  sleepCapacity?: InputMaybe<Scalars['Int']>;
  caretaker?: InputMaybe<LocationCaretakerRelation>;
  caretakerEmail?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['Time']>;
  offers?: InputMaybe<LocationOffersRelation>;
  offerCount?: InputMaybe<Scalars['Int']>;
  mediaItems?: InputMaybe<LocationMediaItemsRelation>;
  votes?: InputMaybe<LocationVotesRelation>;
  voteCount?: InputMaybe<Scalars['Int']>;
  internetSpeedMbps?: InputMaybe<Scalars['Int']>;
  address?: InputMaybe<PartialUpdateLocationAddressInput>;
  bannerImageIpfsHash?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  addressInfo?: InputMaybe<Scalars['String']>;
};

/** 'LocationMediaItem' input values */
export type PartialUpdateLocationMediaItemInput = {
  location?: InputMaybe<LocationMediaItemLocationRelation>;
  category?: InputMaybe<LocationMediaCategory>;
  imageIpfsHash?: InputMaybe<Scalars['String']>;
};

/** 'LocationVote' input values */
export type PartialUpdateLocationVoteInput = {
  location?: InputMaybe<LocationVoteLocationRelation>;
  profile?: InputMaybe<LocationVoteProfileRelation>;
  count?: InputMaybe<Scalars['Int']>;
};

/** 'Offer' input values */
export type PartialUpdateOfferInput = {
  offerType?: InputMaybe<OfferType>;
  title?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Time']>;
  endDate?: InputMaybe<Scalars['Time']>;
  location?: InputMaybe<OfferLocationRelation>;
  locationType?: InputMaybe<LocationType>;
  price?: InputMaybe<PartialUpdateOfferPriceInput>;
  profileRoleConstraints?: InputMaybe<Array<PartialUpdateProfileRoleConstraintInput>>;
  applicationUrl?: InputMaybe<Scalars['String']>;
  imageIpfsHash?: InputMaybe<Scalars['String']>;
};

/** 'OfferPrice' input values */
export type PartialUpdateOfferPriceInput = {
  unit?: InputMaybe<OfferPriceUnit>;
  amountCents?: InputMaybe<Scalars['Int']>;
};

/** 'OtterspaceBadge' input values */
export type PartialUpdateOtterspaceBadgeInput = {
  badgeId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Time']>;
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

/** 'ProfileAvatar' input values */
export type PartialUpdateProfileAvatarInput = {
  url?: InputMaybe<Scalars['String']>;
  contractAddress?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenUri?: InputMaybe<Scalars['String']>;
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
  location?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<PartialUpdateProfileAvatarInput>;
  roles?: InputMaybe<Array<PartialUpdateProfileRoleInput>>;
  citizenshipStatus?: InputMaybe<CitizenshipStatus>;
  contactFields?: InputMaybe<Array<PartialUpdateProfileContactFieldInput>>;
  account?: InputMaybe<ProfileAccountRelation>;
  trackingEvents?: InputMaybe<ProfileTrackingEventsRelation>;
  cabinTokenBalanceInt?: InputMaybe<Scalars['Int']>;
  badgeCount?: InputMaybe<Scalars['Int']>;
  givenVouches?: InputMaybe<ProfileGivenVouchesRelation>;
  receivedVouches?: InputMaybe<ProfileReceivedVouchesRelation>;
  citizenshipMetadata?: InputMaybe<PartialUpdateCitizenshipMetadataInput>;
  locations?: InputMaybe<ProfileLocationsRelation>;
  locationVotes?: InputMaybe<ProfileLocationVotesRelation>;
};

/** 'ProfileRoleConstraint' input values */
export type PartialUpdateProfileRoleConstraintInput = {
  profileRole?: InputMaybe<ProfileRoleType>;
  level?: InputMaybe<ProfileRoleLevelType>;
};

/** 'ProfileRole' input values */
export type PartialUpdateProfileRoleInput = {
  hatId?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<ProfileRoleType>;
  level?: InputMaybe<ProfileRoleLevelType>;
};

/** 'ProfileVouch' input values */
export type PartialUpdateProfileVouchInput = {
  voucher?: InputMaybe<ProfileVouchVoucherRelation>;
  vouchee?: InputMaybe<ProfileVouchVoucheeRelation>;
};

/** 'TrackingEvent' input values */
export type PartialUpdateTrackingEventInput = {
  key?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  profile?: InputMaybe<TrackingEventProfileRelation>;
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

export type ProfileAvatarInput = {
  url: Scalars['String'];
  contractAddress?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenUri?: InputMaybe<Scalars['String']>;
};

export type ProfileContactFieldInput = {
  type: ProfileContactFieldType;
  value: Scalars['String'];
};

/** Allow manipulating the relationship between the types 'Profile' and 'ProfileVouch'. */
export type ProfileGivenVouchesRelation = {
  /** Create one or more documents of type 'ProfileVouch' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<ProfileVouchInput>>>;
  /** Connect one or more documents of type 'ProfileVouch' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'ProfileVouch' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ProfileInput = {
  address: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar?: InputMaybe<ProfileAvatarInput>;
};

/** Allow manipulating the relationship between the types 'Profile' and 'LocationVote'. */
export type ProfileLocationVotesRelation = {
  /** Create one or more documents of type 'LocationVote' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<LocationVoteInput>>>;
  /** Connect one or more documents of type 'LocationVote' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'LocationVote' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** Allow manipulating the relationship between the types 'Profile' and 'Location'. */
export type ProfileLocationsRelation = {
  /** Create one or more documents of type 'Location' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<LocationInput>>>;
  /** Connect one or more documents of type 'Location' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Location' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** Allow manipulating the relationship between the types 'Profile' and 'ProfileVouch'. */
export type ProfileReceivedVouchesRelation = {
  /** Create one or more documents of type 'ProfileVouch' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<ProfileVouchInput>>>;
  /** Connect one or more documents of type 'ProfileVouch' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'ProfileVouch' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'ProfileRoleConstraint' input values */
export type ProfileRoleConstraintInput = {
  profileRole: ProfileRoleType;
  level: ProfileRoleLevelType;
};

/** 'ProfileRole' input values */
export type ProfileRoleInput = {
  hatId?: InputMaybe<Scalars['String']>;
  role: ProfileRoleType;
  level: ProfileRoleLevelType;
};

/** Allow manipulating the relationship between the types 'Profile' and 'TrackingEvent'. */
export type ProfileTrackingEventsRelation = {
  /** Create one or more documents of type 'TrackingEvent' and associate them with the current document. */
  create?: InputMaybe<Array<InputMaybe<TrackingEventInput>>>;
  /** Connect one or more documents of type 'TrackingEvent' with the current document using their IDs. */
  connect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'TrackingEvent' from the current document using their IDs. */
  disconnect?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** 'ProfileVouch' input values */
export type ProfileVouchInput = {
  voucher?: InputMaybe<ProfileVouchVoucherRelation>;
  vouchee?: InputMaybe<ProfileVouchVoucheeRelation>;
};

/** Allow manipulating the relationship between the types 'ProfileVouch' and 'Profile' using the field 'ProfileVouch.vouchee'. */
export type ProfileVouchVoucheeRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'ProfileVouch' and 'Profile' using the field 'ProfileVouch.voucher'. */
export type ProfileVouchVoucherRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

/** 'TrackingEvent' input values */
export type TrackingEventInput = {
  key: Scalars['String'];
  count: Scalars['Int'];
  profile?: InputMaybe<TrackingEventProfileRelation>;
};

/** Allow manipulating the relationship between the types 'TrackingEvent' and 'Profile' using the field 'TrackingEvent.profile'. */
export type TrackingEventProfileRelation = {
  /** Create a document of type 'Profile' and associate it with the current document. */
  create?: InputMaybe<ProfileInput>;
  /** Connect a document of type 'Profile' with the current document using its ID. */
  connect?: InputMaybe<Scalars['ID']>;
};

export type UpdateProfileInput = {
  name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  contactFields?: InputMaybe<Array<ProfileContactFieldInput>>;
  avatar?: InputMaybe<ProfileAvatarInput>;
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
  reactions: ActivityReactionPage;
  text?: Maybe<Scalars['String']>;
  profileRoleAdded?: Maybe<ProfileRoleType>;
  key: Scalars['String'];
  profile: Profile;
  reactedByProfile?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<ActivityMetadata>;
  type: ActivityType;
  transactionId?: Maybe<Scalars['String']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type ActivityReactionsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type ActivityReactedByProfileArgs = {
  profileId: Scalars['ID'];
};

export type ActivityItem = {
  __typename?: 'ActivityItem';
  activity: Activity;
  reactionCount: Scalars['Int'];
  hasReactionByMe: Scalars['Boolean'];
};

export type ActivityMetadata = {
  __typename?: 'ActivityMetadata';
  badge?: Maybe<OtterspaceBadge>;
  profileRole?: Maybe<ProfileRole>;
  citizenshipTokenId?: Maybe<Scalars['String']>;
};

export type ActivityReaction = {
  __typename?: 'ActivityReaction';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  profile: Profile;
  activity: Activity;
};

/** The pagination object for elements of type 'ActivityReaction'. */
export type ActivityReactionPage = {
  __typename?: 'ActivityReactionPage';
  /** The elements of type 'ActivityReaction' in this page. */
  data: Array<Maybe<ActivityReaction>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export enum ActivityType {
  ProfileCreated = 'ProfileCreated',
  ProfileRoleAdded = 'ProfileRoleAdded',
  ProfileBadgeAdded = 'ProfileBadgeAdded',
  VerifiedCitizenship = 'VerifiedCitizenship',
  Text = 'Text'
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

export type CitizenshipMetadata = {
  __typename?: 'CitizenshipMetadata';
  tokenId: Scalars['String'];
  mintedAt: Scalars['Time'];
};

export enum CitizenshipStatus {
  VouchRequested = 'VouchRequested',
  Vouched = 'Vouched',
  Verified = 'Verified'
}

export type GetOffersInput = {
  offerTypes: Array<OfferType>;
};

export type GetProfilesInput = {
  sort?: InputMaybe<ProfileSortType>;
  roleTypes: Array<ProfileRoleType>;
  levelTypes: Array<ProfileRoleLevelType>;
  citizenshipStatuses: Array<CitizenshipStatus>;
  searchQuery?: InputMaybe<Scalars['String']>;
};

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

export type Location = {
  __typename?: 'Location';
  tagline?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  bannerImageIpfsHash?: Maybe<Scalars['String']>;
  votes: LocationVotePage;
  caretaker: Profile;
  description?: Maybe<Scalars['String']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  addressInfo?: Maybe<Scalars['String']>;
  sleepCapacity?: Maybe<Scalars['Int']>;
  internetSpeedMbps?: Maybe<Scalars['Int']>;
  offers: OfferPage;
  mediaItems: LocationMediaItemPage;
  address?: Maybe<LocationAddress>;
  caretakerEmail?: Maybe<Scalars['String']>;
  offerCount?: Maybe<Scalars['Int']>;
  locationType?: Maybe<LocationType>;
  voteCount?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['Time']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type LocationVotesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type LocationOffersArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type LocationMediaItemsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

export type LocationAddress = {
  __typename?: 'LocationAddress';
  lng?: Maybe<Scalars['Float']>;
  formattedAddress?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  routeShort?: Maybe<Scalars['String']>;
  admininstrativeAreaLevel1Short?: Maybe<Scalars['String']>;
  countryShort?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  route?: Maybe<Scalars['String']>;
  admininstrativeAreaLevel1?: Maybe<Scalars['String']>;
  locality?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
};

export enum LocationMediaCategory {
  Sleeping = 'Sleeping',
  Working = 'Working',
  Features = 'Features'
}

export type LocationMediaItem = {
  __typename?: 'LocationMediaItem';
  location: Location;
  /** The document's ID. */
  _id: Scalars['ID'];
  imageIpfsHash?: Maybe<Scalars['String']>;
  category: LocationMediaCategory;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'LocationMediaItem'. */
export type LocationMediaItemPage = {
  __typename?: 'LocationMediaItemPage';
  /** The elements of type 'LocationMediaItem' in this page. */
  data: Array<Maybe<LocationMediaItem>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Location'. */
export type LocationPage = {
  __typename?: 'LocationPage';
  /** The elements of type 'Location' in this page. */
  data: Array<Maybe<Location>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export enum LocationType {
  Outpost = 'Outpost',
  Neighborhood = 'Neighborhood'
}

export type LocationVote = {
  __typename?: 'LocationVote';
  count: Scalars['Int'];
  location: Location;
  /** The document's ID. */
  _id: Scalars['ID'];
  profile: Profile;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'LocationVote'. */
export type LocationVotePage = {
  __typename?: 'LocationVotePage';
  /** The elements of type 'LocationVote' in this page. */
  data: Array<Maybe<LocationVote>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Offer = {
  __typename?: 'Offer';
  location: Location;
  endDate?: Maybe<Scalars['Time']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  price?: Maybe<OfferPrice>;
  offerType?: Maybe<OfferType>;
  imageIpfsHash?: Maybe<Scalars['String']>;
  applicationUrl?: Maybe<Scalars['String']>;
  profileRoleConstraints?: Maybe<Array<ProfileRoleConstraint>>;
  title?: Maybe<Scalars['String']>;
  locationType: LocationType;
  startDate?: Maybe<Scalars['Time']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Offer'. */
export type OfferPage = {
  __typename?: 'OfferPage';
  /** The elements of type 'Offer' in this page. */
  data: Array<Maybe<Offer>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type OfferPrice = {
  __typename?: 'OfferPrice';
  unit: OfferPriceUnit;
  amountCents: Scalars['Int'];
};

export enum OfferPriceUnit {
  FlatFee = 'FlatFee',
  Hourly = 'Hourly',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly'
}

export enum OfferType {
  PaidColiving = 'PaidColiving',
  Residency = 'Residency',
  BuildAndGrowWeek = 'BuildAndGrowWeek'
}

export type OtterspaceBadge = {
  __typename?: 'OtterspaceBadge';
  /** The document's ID. */
  _id: Scalars['ID'];
  createdAt: Scalars['Time'];
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
  trackingEvents: TrackingEventPage;
  locations: LocationPage;
  name: Scalars['String'];
  givenVouches: ProfileVouchPage;
  avatar?: Maybe<ProfileAvatar>;
  location?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  cabinTokenBalanceInt: Scalars['Int'];
  receivedVouches: ProfileVouchPage;
  bio?: Maybe<Scalars['String']>;
  citizenshipStatus?: Maybe<CitizenshipStatus>;
  roles: Array<ProfileRole>;
  createdAt: Scalars['Time'];
  citizenshipMetadata?: Maybe<CitizenshipMetadata>;
  account: Account;
  badgeCount: Scalars['Int'];
  locationVotes: LocationVotePage;
  contactFields: Array<ProfileContactField>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type ProfileTrackingEventsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type ProfileLocationsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type ProfileGivenVouchesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type ProfileReceivedVouchesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type ProfileLocationVotesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

export type ProfileAvatar = {
  __typename?: 'ProfileAvatar';
  url: Scalars['String'];
  contractAddress?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  tokenUri?: Maybe<Scalars['String']>;
};

export type ProfileContactField = {
  __typename?: 'ProfileContactField';
  type: ProfileContactFieldType;
  value: Scalars['String'];
};

export enum ProfileContactFieldType {
  Email = 'Email',
  Discord = 'Discord',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Telegram = 'Telegram',
  Lens = 'Lens',
  Website = 'Website'
}

/** The pagination object for elements of type 'Profile'. */
export type ProfilePage = {
  __typename?: 'ProfilePage';
  /** The elements of type 'Profile' in this page. */
  data: Array<Maybe<Profile>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type ProfileRole = {
  __typename?: 'ProfileRole';
  hatId?: Maybe<Scalars['String']>;
  role: ProfileRoleType;
  level: ProfileRoleLevelType;
};

export type ProfileRoleConstraint = {
  __typename?: 'ProfileRoleConstraint';
  profileRole: ProfileRoleType;
  level: ProfileRoleLevelType;
};

export enum ProfileRoleLevelType {
  Apprentice = 'Apprentice',
  Artisan = 'Artisan',
  Custodian = 'Custodian'
}

export enum ProfileRoleType {
  Caretaker = 'Caretaker',
  Builder = 'Builder',
  Gatherer = 'Gatherer',
  Naturalist = 'Naturalist',
  Creator = 'Creator',
  Resident = 'Resident'
}

export enum ProfileSortType {
  CreatedAtAsc = 'CreatedAtAsc',
  CreatedAtDesc = 'CreatedAtDesc',
  CabinBalanceAsc = 'CabinBalanceAsc',
  CabinBalanceDesc = 'CabinBalanceDesc',
  BadgeCountAsc = 'BadgeCountAsc',
  BadgeCountDesc = 'BadgeCountDesc'
}

export type ProfileVouch = {
  __typename?: 'ProfileVouch';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  voucher: Profile;
  vouchee: Profile;
};

/** The pagination object for elements of type 'ProfileVouch'. */
export type ProfileVouchPage = {
  __typename?: 'ProfileVouchPage';
  /** The elements of type 'ProfileVouch' in this page. */
  data: Array<Maybe<ProfileVouch>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a document from the collection of 'OtterspaceBadge' by its id. */
  findOtterspaceBadgeByID?: Maybe<OtterspaceBadge>;
  getLocationsByIds: Array<Location>;
  /** Find a document from the collection of 'ProfileVouch' by its id. */
  findProfileVouchByID?: Maybe<ProfileVouch>;
  /** Find a document from the collection of 'Location' by its id. */
  findLocationByID?: Maybe<Location>;
  citizensCount: Scalars['Int'];
  /** Find a document from the collection of 'Profile' by its id. */
  findProfileByID?: Maybe<Profile>;
  /** Find a document from the collection of 'BlockSyncAttempt' by its id. */
  findBlockSyncAttemptByID?: Maybe<BlockSyncAttempt>;
  locationsByLocationType: QueryLocationsByLocationTypePage;
  /** Find a document from the collection of 'TrackingEvent' by its id. */
  findTrackingEventByID?: Maybe<TrackingEvent>;
  /** Find a document from the collection of 'LocationVote' by its id. */
  findLocationVoteByID?: Maybe<LocationVote>;
  /** Find a document from the collection of 'Offer' by its id. */
  findOfferByID?: Maybe<Offer>;
  accountByAddress?: Maybe<Account>;
  getProfiles: QueryGetProfilesPage;
  /** Find a document from the collection of 'Activity' by its id. */
  findActivityByID?: Maybe<Activity>;
  getOffers: QueryGetOffersPage;
  profilesCount: Scalars['Int'];
  /** Find a document from the collection of 'Hat' by its id. */
  findHatByID?: Maybe<Hat>;
  syncAttemptByKeyAndStatus?: Maybe<BlockSyncAttempt>;
  myVouchesThisYear: Scalars['Int'];
  syncAttemptsByKey: BlockSyncAttemptPage;
  allProfiles: ProfilePage;
  /** Find a document from the collection of 'LocationMediaItem' by its id. */
  findLocationMediaItemByID?: Maybe<LocationMediaItem>;
  me: Profile;
  /** Find a document from the collection of 'OtterspaceBadgeSpec' by its id. */
  findOtterspaceBadgeSpecByID?: Maybe<OtterspaceBadgeSpec>;
  allActivities: QueryAllActivitiesPage;
  activitiesByProfile: QueryActivitiesByProfilePage;
  allAccounts: AccountPage;
  /** Find a document from the collection of 'Account' by its id. */
  findAccountByID?: Maybe<Account>;
  offersCount: Scalars['Int'];
  allBadges: OtterspaceBadgePage;
  /** Find a document from the collection of 'ActivityReaction' by its id. */
  findActivityReactionByID?: Maybe<ActivityReaction>;
  tokenHoldersCount: Scalars['Int'];
  allHats: HatPage;
};


export type QueryFindOtterspaceBadgeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetLocationsByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryFindProfileVouchByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindLocationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCitizensCountArgs = {
  status: CitizenshipStatus;
};


export type QueryFindProfileByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindBlockSyncAttemptByIdArgs = {
  id: Scalars['ID'];
};


export type QueryLocationsByLocationTypeArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
  locationType: LocationType;
};


export type QueryFindTrackingEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindLocationVoteByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindOfferByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAccountByAddressArgs = {
  address: Scalars['String'];
};


export type QueryGetProfilesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
  input: GetProfilesInput;
};


export type QueryFindActivityByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetOffersArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
  input: GetOffersInput;
};


export type QueryProfilesCountArgs = {
  input?: InputMaybe<GetProfilesInput>;
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


export type QueryAllProfilesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryFindLocationMediaItemByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindOtterspaceBadgeSpecByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllActivitiesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryActivitiesByProfileArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
  profileId: Scalars['ID'];
};


export type QueryAllAccountsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryFindAccountByIdArgs = {
  id: Scalars['ID'];
};


export type QueryOffersCountArgs = {
  input?: InputMaybe<GetOffersInput>;
};


export type QueryAllBadgesArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};


export type QueryFindActivityReactionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllHatsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

/** The pagination object for elements of type 'ActivityItem'. */
export type QueryActivitiesByProfilePage = {
  __typename?: 'QueryActivitiesByProfilePage';
  /** The elements of type 'ActivityItem' in this page. */
  data: Array<Maybe<ActivityItem>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'ActivityItem'. */
export type QueryAllActivitiesPage = {
  __typename?: 'QueryAllActivitiesPage';
  /** The elements of type 'ActivityItem' in this page. */
  data: Array<Maybe<ActivityItem>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Offer'. */
export type QueryGetOffersPage = {
  __typename?: 'QueryGetOffersPage';
  /** The elements of type 'Offer' in this page. */
  data: Array<Maybe<Offer>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Profile'. */
export type QueryGetProfilesPage = {
  __typename?: 'QueryGetProfilesPage';
  /** The elements of type 'Profile' in this page. */
  data: Array<Maybe<Profile>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Location'. */
export type QueryLocationsByLocationTypePage = {
  __typename?: 'QueryLocationsByLocationTypePage';
  /** The elements of type 'Location' in this page. */
  data: Array<Maybe<Location>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type TrackingEvent = {
  __typename?: 'TrackingEvent';
  count: Scalars['Int'];
  /** The document's ID. */
  _id: Scalars['ID'];
  key: Scalars['String'];
  profile: Profile;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'TrackingEvent'. */
export type TrackingEventPage = {
  __typename?: 'TrackingEventPage';
  /** The elements of type 'TrackingEvent' in this page. */
  data: Array<Maybe<TrackingEvent>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string }, trackingEvents: { __typename?: 'TrackingEventPage', data: Array<{ __typename?: 'TrackingEvent', _id: string, key: string, count: number } | null> }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null } };

export type MeFragment = { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string }, trackingEvents: { __typename?: 'TrackingEventPage', data: Array<{ __typename?: 'TrackingEvent', _id: string, key: string, count: number } | null> }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null };

export type TrackingEventFragment = { __typename?: 'TrackingEvent', _id: string, key: string, count: number };

export type ActivityFragment = { __typename?: 'Activity', _id: string, timestamp: any, type: ActivityType, text?: string | null, metadata?: { __typename?: 'ActivityMetadata', citizenshipTokenId?: string | null, badge?: { __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', name: string, description: string, image: string } } | null, profileRole?: { __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType } | null } | null, profile: { __typename?: 'Profile', _id: string, name: string, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null } };

export type ActivityItemFragment = { __typename?: 'ActivityItem', reactionCount: number, hasReactionByMe: boolean, activity: { __typename?: 'Activity', _id: string, timestamp: any, type: ActivityType, text?: string | null, metadata?: { __typename?: 'ActivityMetadata', citizenshipTokenId?: string | null, badge?: { __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', name: string, description: string, image: string } } | null, profileRole?: { __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType } | null } | null, profile: { __typename?: 'Profile', _id: string, name: string, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null } } };

export type CreateTextActivityMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type CreateTextActivityMutation = { __typename?: 'Mutation', createTextActivity: { __typename?: 'Activity', _id: string, timestamp: any, type: ActivityType, text?: string | null, metadata?: { __typename?: 'ActivityMetadata', citizenshipTokenId?: string | null, badge?: { __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', name: string, description: string, image: string } } | null, profileRole?: { __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType } | null } | null, profile: { __typename?: 'Profile', _id: string, name: string, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null } } };

export type DeleteActivityMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity?: { __typename?: 'Activity', _id: string, timestamp: any, type: ActivityType, text?: string | null, metadata?: { __typename?: 'ActivityMetadata', citizenshipTokenId?: string | null, badge?: { __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', name: string, description: string, image: string } } | null, profileRole?: { __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType } | null } | null, profile: { __typename?: 'Profile', _id: string, name: string, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null } } | null };

export type GetActivitiesQueryVariables = Exact<{
  size?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetActivitiesQuery = { __typename?: 'Query', allActivities: { __typename?: 'QueryAllActivitiesPage', after?: string | null, data: Array<{ __typename?: 'ActivityItem', reactionCount: number, hasReactionByMe: boolean, activity: { __typename?: 'Activity', _id: string, timestamp: any, type: ActivityType, text?: string | null, metadata?: { __typename?: 'ActivityMetadata', citizenshipTokenId?: string | null, badge?: { __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', name: string, description: string, image: string } } | null, profileRole?: { __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType } | null } | null, profile: { __typename?: 'Profile', _id: string, name: string, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null } } } | null> } };

export type GetActivitySummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitySummaryQuery = { __typename?: 'Query', profilesCount: number, tokenHoldersCount: number, citizensCount: number };

export type LikeActivityMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikeActivityMutation = { __typename?: 'Mutation', likeActivity: { __typename?: 'ActivityReaction', _id: string } };

export type UnlikeActivityMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlikeActivityMutation = { __typename?: 'Mutation', unlikeActivity: { __typename?: 'ActivityReaction', _id: string } };

export type GetProfileByAddressQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type GetProfileByAddressQuery = { __typename?: 'Query', accountByAddress?: { __typename?: 'Account', _id: string, profile?: { __typename?: 'Profile', _id: string, createdAt: any, name: string, citizenshipStatus?: CitizenshipStatus | null, bio?: string | null, cabinTokenBalanceInt: number, badgeCount: number, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }> } | null } | null };

export type GetProfilesQueryVariables = Exact<{
  input: GetProfilesInput;
  size?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetProfilesQuery = { __typename?: 'Query', getProfiles: { __typename?: 'QueryGetProfilesPage', after?: string | null, data: Array<{ __typename?: 'Profile', _id: string, createdAt: any, name: string, citizenshipStatus?: CitizenshipStatus | null, bio?: string | null, cabinTokenBalanceInt: number, badgeCount: number, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }> } | null> } };

export type GetProfilesCountQueryVariables = Exact<{
  input: GetProfilesInput;
}>;


export type GetProfilesCountQuery = { __typename?: 'Query', profilesCount: number };

export type ProfileFragment = { __typename?: 'Profile', _id: string, createdAt: any, name: string, citizenshipStatus?: CitizenshipStatus | null, bio?: string | null, cabinTokenBalanceInt: number, badgeCount: number, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }> };

export type CreateLocationMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation?: { __typename?: 'Location', _id: string, locationType?: LocationType | null, name?: string | null, tagline?: string | null, sleepCapacity?: number | null, caretakerEmail?: string | null, publishedAt?: any | null, internetSpeedMbps?: number | null, bannerImageIpfsHash?: string | null, description?: string | null, addressInfo?: string | null, caretaker: { __typename?: 'Profile', _id: string, email: string, name: string, account: { __typename?: 'Account', address: string } }, mediaItems: { __typename?: 'LocationMediaItemPage', data: Array<{ __typename?: 'LocationMediaItem', imageIpfsHash?: string | null } | null> }, votes: { __typename?: 'LocationVotePage', data: Array<{ __typename?: 'LocationVote', count: number, profile: { __typename?: 'Profile', _id: string } } | null> }, address?: { __typename?: 'LocationAddress', lat?: number | null, lng?: number | null, formattedAddress?: string | null, streetNumber?: string | null, route?: string | null, routeShort?: string | null, locality?: string | null, admininstrativeAreaLevel1?: string | null, admininstrativeAreaLevel1Short?: string | null, country?: string | null, countryShort?: string | null, postalCode?: string | null } | null } | null };

export type GetLocationByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetLocationByIdQuery = { __typename?: 'Query', findLocationByID?: { __typename?: 'Location', _id: string, locationType?: LocationType | null, name?: string | null, tagline?: string | null, sleepCapacity?: number | null, caretakerEmail?: string | null, publishedAt?: any | null, internetSpeedMbps?: number | null, bannerImageIpfsHash?: string | null, description?: string | null, addressInfo?: string | null, caretaker: { __typename?: 'Profile', _id: string, email: string, name: string, account: { __typename?: 'Account', address: string } }, mediaItems: { __typename?: 'LocationMediaItemPage', data: Array<{ __typename?: 'LocationMediaItem', imageIpfsHash?: string | null } | null> }, votes: { __typename?: 'LocationVotePage', data: Array<{ __typename?: 'LocationVote', count: number, profile: { __typename?: 'Profile', _id: string } } | null> }, address?: { __typename?: 'LocationAddress', lat?: number | null, lng?: number | null, formattedAddress?: string | null, streetNumber?: string | null, route?: string | null, routeShort?: string | null, locality?: string | null, admininstrativeAreaLevel1?: string | null, admininstrativeAreaLevel1Short?: string | null, country?: string | null, countryShort?: string | null, postalCode?: string | null } | null } | null };

export type GetLocationVoteCountsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetLocationVoteCountsByIdsQuery = { __typename?: 'Query', getLocationsByIds: Array<{ __typename?: 'Location', _id: string, voteCount?: number | null, locationType?: LocationType | null }> };

export type GetLocationsByLocationTypeQueryVariables = Exact<{
  locationType: LocationType;
  size?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetLocationsByLocationTypeQuery = { __typename?: 'Query', locationsByLocationType: { __typename?: 'QueryLocationsByLocationTypePage', after?: string | null, data: Array<{ __typename?: 'Location', _id: string, locationType?: LocationType | null, name?: string | null, tagline?: string | null, sleepCapacity?: number | null, publishedAt?: any | null, internetSpeedMbps?: number | null, bannerImageIpfsHash?: string | null, description?: string | null, voteCount?: number | null, offerCount?: number | null, caretaker: { __typename?: 'Profile', _id: string, name: string }, address?: { __typename?: 'LocationAddress', locality?: string | null, admininstrativeAreaLevel1Short?: string | null } | null } | null> } };

export type CaretakerFragment = { __typename?: 'Profile', _id: string, email: string, name: string, account: { __typename?: 'Account', address: string } };

export type LocationFragment = { __typename?: 'Location', _id: string, locationType?: LocationType | null, name?: string | null, tagline?: string | null, sleepCapacity?: number | null, caretakerEmail?: string | null, publishedAt?: any | null, internetSpeedMbps?: number | null, bannerImageIpfsHash?: string | null, description?: string | null, addressInfo?: string | null, caretaker: { __typename?: 'Profile', _id: string, email: string, name: string, account: { __typename?: 'Account', address: string } }, mediaItems: { __typename?: 'LocationMediaItemPage', data: Array<{ __typename?: 'LocationMediaItem', imageIpfsHash?: string | null } | null> }, votes: { __typename?: 'LocationVotePage', data: Array<{ __typename?: 'LocationVote', count: number, profile: { __typename?: 'Profile', _id: string } } | null> }, address?: { __typename?: 'LocationAddress', lat?: number | null, lng?: number | null, formattedAddress?: string | null, streetNumber?: string | null, route?: string | null, routeShort?: string | null, locality?: string | null, admininstrativeAreaLevel1?: string | null, admininstrativeAreaLevel1Short?: string | null, country?: string | null, countryShort?: string | null, postalCode?: string | null } | null };

export type LocationItemFragment = { __typename?: 'Location', _id: string, locationType?: LocationType | null, name?: string | null, tagline?: string | null, sleepCapacity?: number | null, publishedAt?: any | null, internetSpeedMbps?: number | null, bannerImageIpfsHash?: string | null, description?: string | null, voteCount?: number | null, offerCount?: number | null, caretaker: { __typename?: 'Profile', _id: string, name: string }, address?: { __typename?: 'LocationAddress', locality?: string | null, admininstrativeAreaLevel1Short?: string | null } | null };

export type MyLocationVotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyLocationVotesQuery = { __typename?: 'Query', me: { __typename?: 'Profile', _id: string, cabinTokenBalanceInt: number, locationVotes: { __typename?: 'LocationVotePage', data: Array<{ __typename?: 'LocationVote', _id: string, count: number, location: { __typename?: 'Location', _id: string, name?: string | null } } | null> } } };

export type LocationVoteFragment = { __typename?: 'LocationVote', _id: string, count: number, location: { __typename?: 'Location', _id: string, name?: string | null } };

export type UpdateLocationMutationVariables = Exact<{
  id: Scalars['ID'];
  data: PartialUpdateLocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', partialUpdateLocation?: { __typename?: 'Location', _id: string, locationType?: LocationType | null, name?: string | null, tagline?: string | null, sleepCapacity?: number | null, caretakerEmail?: string | null, publishedAt?: any | null, internetSpeedMbps?: number | null, bannerImageIpfsHash?: string | null, description?: string | null, addressInfo?: string | null, caretaker: { __typename?: 'Profile', _id: string, email: string, name: string, account: { __typename?: 'Account', address: string } }, mediaItems: { __typename?: 'LocationMediaItemPage', data: Array<{ __typename?: 'LocationMediaItem', imageIpfsHash?: string | null } | null> }, votes: { __typename?: 'LocationVotePage', data: Array<{ __typename?: 'LocationVote', count: number, profile: { __typename?: 'Profile', _id: string } } | null> }, address?: { __typename?: 'LocationAddress', lat?: number | null, lng?: number | null, formattedAddress?: string | null, streetNumber?: string | null, route?: string | null, routeShort?: string | null, locality?: string | null, admininstrativeAreaLevel1?: string | null, admininstrativeAreaLevel1Short?: string | null, country?: string | null, countryShort?: string | null, postalCode?: string | null } | null } | null };

export type GetOffersQueryVariables = Exact<{
  input: GetOffersInput;
  size?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetOffersQuery = { __typename?: 'Query', getOffers: { __typename?: 'QueryGetOffersPage', after?: string | null, data: Array<{ __typename?: 'Offer', _id: string, offerType?: OfferType | null, locationType: LocationType, title?: string | null, startDate?: any | null, endDate?: any | null, imageIpfsHash?: string | null, location: { __typename?: 'Location', _id: string, name?: string | null, address?: { __typename?: 'LocationAddress', locality?: string | null, admininstrativeAreaLevel1Short?: string | null } | null } } | null> } };

export type GetOffersCountQueryVariables = Exact<{
  input: GetOffersInput;
}>;


export type GetOffersCountQuery = { __typename?: 'Query', offersCount: number };

export type OfferFragment = { __typename?: 'Offer', _id: string, offerType?: OfferType | null, title?: string | null, startDate?: any | null, endDate?: any | null, applicationUrl?: string | null, imageIpfsHash?: string | null, price?: { __typename?: 'OfferPrice', unit: OfferPriceUnit, amountCents: number } | null, profileRoleConstraints?: Array<{ __typename?: 'ProfileRoleConstraint', profileRole: ProfileRoleType, level: ProfileRoleLevelType }> | null };

export type OfferItemFragment = { __typename?: 'Offer', _id: string, offerType?: OfferType | null, locationType: LocationType, title?: string | null, startDate?: any | null, endDate?: any | null, imageIpfsHash?: string | null, location: { __typename?: 'Location', _id: string, name?: string | null, address?: { __typename?: 'LocationAddress', locality?: string | null, admininstrativeAreaLevel1Short?: string | null } | null } };

export type GetProfileByIdFragment = { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, cabinTokenBalanceInt: number, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string, badges: { __typename?: 'OtterspaceBadgePage', data: Array<{ __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', _id: string, name: string, description: string, image: string } } | null> } }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null };

export type GetProfileByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProfileByIdQuery = { __typename?: 'Query', findProfileByID?: { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, cabinTokenBalanceInt: number, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string, badges: { __typename?: 'OtterspaceBadgePage', data: Array<{ __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', _id: string, name: string, description: string, image: string } } | null> } }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null } | null, activitiesByProfile: { __typename?: 'QueryActivitiesByProfilePage', data: Array<{ __typename?: 'ActivityItem', reactionCount: number, hasReactionByMe: boolean, activity: { __typename?: 'Activity', _id: string, timestamp: any, type: ActivityType, text?: string | null, metadata?: { __typename?: 'ActivityMetadata', citizenshipTokenId?: string | null, badge?: { __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', name: string, description: string, image: string } } | null, profileRole?: { __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType } | null } | null, profile: { __typename?: 'Profile', _id: string, name: string, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null } } } | null> } };

export type LogTrackingEventMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type LogTrackingEventMutation = { __typename?: 'Mutation', logTrackingEvent: { __typename?: 'TrackingEvent', _id: string, key: string, count: number, profile: { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string }, trackingEvents: { __typename?: 'TrackingEventPage', data: Array<{ __typename?: 'TrackingEvent', _id: string, key: string, count: number } | null> }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null } } };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['ID'];
  data?: InputMaybe<UpdateProfileInput>;
  roleTypes?: InputMaybe<Array<ProfileRoleType> | ProfileRoleType>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string }, trackingEvents: { __typename?: 'TrackingEventPage', data: Array<{ __typename?: 'TrackingEvent', _id: string, key: string, count: number } | null> }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null } };

export type MyVouchesThisYearQueryVariables = Exact<{ [key: string]: never; }>;


export type MyVouchesThisYearQuery = { __typename?: 'Query', myVouchesThisYear: number };

export type UnvouchProfileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnvouchProfileMutation = { __typename?: 'Mutation', unvouchProfile: { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, cabinTokenBalanceInt: number, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string, badges: { __typename?: 'OtterspaceBadgePage', data: Array<{ __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', _id: string, name: string, description: string, image: string } } | null> } }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null } };

export type UpdateProfileCitizenshipStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  citizenshipStatus?: InputMaybe<CitizenshipStatus>;
}>;


export type UpdateProfileCitizenshipStatusMutation = { __typename?: 'Mutation', partialUpdateProfile?: { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, cabinTokenBalanceInt: number, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string, badges: { __typename?: 'OtterspaceBadgePage', data: Array<{ __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', _id: string, name: string, description: string, image: string } } | null> } }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null } | null };

export type VouchProfileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type VouchProfileMutation = { __typename?: 'Mutation', vouchProfile: { __typename?: 'Profile', _id: string, name: string, email: string, bio?: string | null, location?: string | null, createdAt: any, citizenshipStatus?: CitizenshipStatus | null, cabinTokenBalanceInt: number, roles: Array<{ __typename?: 'ProfileRole', role: ProfileRoleType, level: ProfileRoleLevelType, hatId?: string | null }>, avatar?: { __typename?: 'ProfileAvatar', url: string } | null, account: { __typename?: 'Account', _id: string, address: string, badges: { __typename?: 'OtterspaceBadgePage', data: Array<{ __typename?: 'OtterspaceBadge', _id: string, badgeId: string, spec: { __typename?: 'OtterspaceBadgeSpec', _id: string, name: string, description: string, image: string } } | null> } }, contactFields: Array<{ __typename?: 'ProfileContactField', type: ProfileContactFieldType, value: string }>, receivedVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', voucher: { __typename?: 'Profile', _id: string, name: string } } | null> }, givenVouches: { __typename?: 'ProfileVouchPage', data: Array<{ __typename?: 'ProfileVouch', vouchee: { __typename?: 'Profile', _id: string, name: string } } | null> }, citizenshipMetadata?: { __typename?: 'CitizenshipMetadata', tokenId: string, mintedAt: any } | null } };

export const TrackingEventFragmentDoc = gql`
    fragment TrackingEvent on TrackingEvent {
  _id
  key
  count
}
    `;
export const MeFragmentDoc = gql`
    fragment Me on Profile {
  _id
  name
  email
  bio
  location
  createdAt
  citizenshipStatus
  roles {
    role
    level
    hatId
  }
  avatar {
    url
  }
  account {
    _id
    address
  }
  trackingEvents {
    data {
      ...TrackingEvent
    }
  }
  contactFields {
    type
    value
  }
  receivedVouches {
    data {
      voucher {
        _id
        name
      }
    }
  }
  givenVouches {
    data {
      vouchee {
        _id
        name
      }
    }
  }
  citizenshipMetadata {
    tokenId
    mintedAt
  }
}
    ${TrackingEventFragmentDoc}`;
export const ActivityFragmentDoc = gql`
    fragment Activity on Activity {
  _id
  timestamp
  type
  text
  metadata {
    badge {
      _id
      badgeId
      spec {
        name
        description
        image
      }
    }
    profileRole {
      role
      level
    }
    citizenshipTokenId
  }
  profile {
    _id
    name
    citizenshipStatus
    roles {
      role
      level
    }
    avatar {
      url
    }
  }
}
    `;
export const ActivityItemFragmentDoc = gql`
    fragment ActivityItem on ActivityItem {
  activity {
    ...Activity
  }
  reactionCount
  hasReactionByMe
}
    ${ActivityFragmentDoc}`;
export const ProfileFragmentDoc = gql`
    fragment Profile on Profile {
  _id
  createdAt
  name
  avatar {
    url
  }
  roles {
    role
    level
  }
  citizenshipStatus
  bio
  cabinTokenBalanceInt
  badgeCount
}
    `;
export const CaretakerFragmentDoc = gql`
    fragment Caretaker on Profile {
  _id
  email
  name
  account {
    address
  }
}
    `;
export const LocationFragmentDoc = gql`
    fragment Location on Location {
  _id
  locationType
  name
  tagline
  sleepCapacity
  caretaker {
    ...Caretaker
  }
  caretakerEmail
  publishedAt
  mediaItems {
    data {
      imageIpfsHash
    }
  }
  votes {
    data {
      count
      profile {
        _id
      }
    }
  }
  internetSpeedMbps
  address {
    lat
    lng
    formattedAddress
    streetNumber
    route
    routeShort
    locality
    admininstrativeAreaLevel1
    admininstrativeAreaLevel1Short
    country
    countryShort
    postalCode
  }
  bannerImageIpfsHash
  description
  addressInfo
}
    ${CaretakerFragmentDoc}`;
export const LocationItemFragmentDoc = gql`
    fragment LocationItem on Location {
  _id
  locationType
  name
  tagline
  sleepCapacity
  caretaker {
    _id
    name
  }
  publishedAt
  internetSpeedMbps
  address {
    locality
    admininstrativeAreaLevel1Short
  }
  bannerImageIpfsHash
  description
  voteCount
  offerCount
}
    `;
export const LocationVoteFragmentDoc = gql`
    fragment LocationVote on LocationVote {
  _id
  location {
    _id
    name
  }
  count
}
    `;
export const OfferFragmentDoc = gql`
    fragment Offer on Offer {
  _id
  offerType
  title
  startDate
  endDate
  price {
    unit
    amountCents
  }
  profileRoleConstraints {
    profileRole
    level
  }
  applicationUrl
  imageIpfsHash
}
    `;
export const OfferItemFragmentDoc = gql`
    fragment OfferItem on Offer {
  _id
  offerType
  locationType
  title
  startDate
  endDate
  imageIpfsHash
  location {
    _id
    name
    address {
      locality
      admininstrativeAreaLevel1Short
    }
  }
}
    `;
export const GetProfileByIdFragmentDoc = gql`
    fragment GetProfileById on Profile {
  _id
  name
  email
  bio
  location
  createdAt
  citizenshipStatus
  cabinTokenBalanceInt
  roles {
    role
    level
    hatId
  }
  avatar {
    url
  }
  account {
    _id
    address
    badges {
      data {
        _id
        badgeId
        spec {
          _id
          name
          description
          image
        }
      }
    }
  }
  contactFields {
    type
    value
  }
  receivedVouches {
    data {
      voucher {
        _id
        name
      }
    }
  }
  givenVouches {
    data {
      vouchee {
        _id
        name
      }
    }
  }
  citizenshipMetadata {
    tokenId
    mintedAt
  }
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreateTextActivityDocument = gql`
    mutation CreateTextActivity($text: String!) {
  createTextActivity(text: $text) {
    ...Activity
  }
}
    ${ActivityFragmentDoc}`;
export type CreateTextActivityMutationFn = Apollo.MutationFunction<CreateTextActivityMutation, CreateTextActivityMutationVariables>;

/**
 * __useCreateTextActivityMutation__
 *
 * To run a mutation, you first call `useCreateTextActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTextActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTextActivityMutation, { data, loading, error }] = useCreateTextActivityMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateTextActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateTextActivityMutation, CreateTextActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTextActivityMutation, CreateTextActivityMutationVariables>(CreateTextActivityDocument, options);
      }
export type CreateTextActivityMutationHookResult = ReturnType<typeof useCreateTextActivityMutation>;
export type CreateTextActivityMutationResult = Apollo.MutationResult<CreateTextActivityMutation>;
export type CreateTextActivityMutationOptions = Apollo.BaseMutationOptions<CreateTextActivityMutation, CreateTextActivityMutationVariables>;
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($id: ID!) {
  deleteActivity(id: $id) {
    ...Activity
  }
}
    ${ActivityFragmentDoc}`;
export type DeleteActivityMutationFn = Apollo.MutationFunction<DeleteActivityMutation, DeleteActivityMutationVariables>;

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(DeleteActivityDocument, options);
      }
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>;
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>;
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<DeleteActivityMutation, DeleteActivityMutationVariables>;
export const GetActivitiesDocument = gql`
    query GetActivities($size: Int, $cursor: String) {
  allActivities(_size: $size, _cursor: $cursor) {
    data {
      ...ActivityItem
    }
    after
  }
}
    ${ActivityItemFragmentDoc}`;

/**
 * __useGetActivitiesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesQuery({
 *   variables: {
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
      }
export function useGetActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
        }
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<GetActivitiesQuery, GetActivitiesQueryVariables>;
export const GetActivitySummaryDocument = gql`
    query GetActivitySummary {
  profilesCount
  tokenHoldersCount
  citizensCount(status: Verified)
}
    `;

/**
 * __useGetActivitySummaryQuery__
 *
 * To run a query within a React component, call `useGetActivitySummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitySummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitySummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitySummaryQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitySummaryQuery, GetActivitySummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivitySummaryQuery, GetActivitySummaryQueryVariables>(GetActivitySummaryDocument, options);
      }
export function useGetActivitySummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitySummaryQuery, GetActivitySummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivitySummaryQuery, GetActivitySummaryQueryVariables>(GetActivitySummaryDocument, options);
        }
export type GetActivitySummaryQueryHookResult = ReturnType<typeof useGetActivitySummaryQuery>;
export type GetActivitySummaryLazyQueryHookResult = ReturnType<typeof useGetActivitySummaryLazyQuery>;
export type GetActivitySummaryQueryResult = Apollo.QueryResult<GetActivitySummaryQuery, GetActivitySummaryQueryVariables>;
export const LikeActivityDocument = gql`
    mutation LikeActivity($id: ID!) {
  likeActivity(id: $id) {
    _id
  }
}
    `;
export type LikeActivityMutationFn = Apollo.MutationFunction<LikeActivityMutation, LikeActivityMutationVariables>;

/**
 * __useLikeActivityMutation__
 *
 * To run a mutation, you first call `useLikeActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeActivityMutation, { data, loading, error }] = useLikeActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeActivityMutation(baseOptions?: Apollo.MutationHookOptions<LikeActivityMutation, LikeActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeActivityMutation, LikeActivityMutationVariables>(LikeActivityDocument, options);
      }
export type LikeActivityMutationHookResult = ReturnType<typeof useLikeActivityMutation>;
export type LikeActivityMutationResult = Apollo.MutationResult<LikeActivityMutation>;
export type LikeActivityMutationOptions = Apollo.BaseMutationOptions<LikeActivityMutation, LikeActivityMutationVariables>;
export const UnlikeActivityDocument = gql`
    mutation UnlikeActivity($id: ID!) {
  unlikeActivity(id: $id) {
    _id
  }
}
    `;
export type UnlikeActivityMutationFn = Apollo.MutationFunction<UnlikeActivityMutation, UnlikeActivityMutationVariables>;

/**
 * __useUnlikeActivityMutation__
 *
 * To run a mutation, you first call `useUnlikeActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeActivityMutation, { data, loading, error }] = useUnlikeActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlikeActivityMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeActivityMutation, UnlikeActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikeActivityMutation, UnlikeActivityMutationVariables>(UnlikeActivityDocument, options);
      }
export type UnlikeActivityMutationHookResult = ReturnType<typeof useUnlikeActivityMutation>;
export type UnlikeActivityMutationResult = Apollo.MutationResult<UnlikeActivityMutation>;
export type UnlikeActivityMutationOptions = Apollo.BaseMutationOptions<UnlikeActivityMutation, UnlikeActivityMutationVariables>;
export const GetProfileByAddressDocument = gql`
    query GetProfileByAddress($address: String!) {
  accountByAddress(address: $address) {
    _id
    profile {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

/**
 * __useGetProfileByAddressQuery__
 *
 * To run a query within a React component, call `useGetProfileByAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileByAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileByAddressQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetProfileByAddressQuery(baseOptions: Apollo.QueryHookOptions<GetProfileByAddressQuery, GetProfileByAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileByAddressQuery, GetProfileByAddressQueryVariables>(GetProfileByAddressDocument, options);
      }
export function useGetProfileByAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileByAddressQuery, GetProfileByAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileByAddressQuery, GetProfileByAddressQueryVariables>(GetProfileByAddressDocument, options);
        }
export type GetProfileByAddressQueryHookResult = ReturnType<typeof useGetProfileByAddressQuery>;
export type GetProfileByAddressLazyQueryHookResult = ReturnType<typeof useGetProfileByAddressLazyQuery>;
export type GetProfileByAddressQueryResult = Apollo.QueryResult<GetProfileByAddressQuery, GetProfileByAddressQueryVariables>;
export const GetProfilesDocument = gql`
    query GetProfiles($input: GetProfilesInput!, $size: Int, $cursor: String) {
  getProfiles(input: $input, _size: $size, _cursor: $cursor) {
    data {
      ...Profile
    }
    after
  }
}
    ${ProfileFragmentDoc}`;

/**
 * __useGetProfilesQuery__
 *
 * To run a query within a React component, call `useGetProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilesQuery({
 *   variables: {
 *      input: // value for 'input'
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetProfilesQuery(baseOptions: Apollo.QueryHookOptions<GetProfilesQuery, GetProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, options);
      }
export function useGetProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfilesQuery, GetProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, options);
        }
export type GetProfilesQueryHookResult = ReturnType<typeof useGetProfilesQuery>;
export type GetProfilesLazyQueryHookResult = ReturnType<typeof useGetProfilesLazyQuery>;
export type GetProfilesQueryResult = Apollo.QueryResult<GetProfilesQuery, GetProfilesQueryVariables>;
export const GetProfilesCountDocument = gql`
    query GetProfilesCount($input: GetProfilesInput!) {
  profilesCount(input: $input)
}
    `;

/**
 * __useGetProfilesCountQuery__
 *
 * To run a query within a React component, call `useGetProfilesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilesCountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProfilesCountQuery(baseOptions: Apollo.QueryHookOptions<GetProfilesCountQuery, GetProfilesCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfilesCountQuery, GetProfilesCountQueryVariables>(GetProfilesCountDocument, options);
      }
export function useGetProfilesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfilesCountQuery, GetProfilesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfilesCountQuery, GetProfilesCountQueryVariables>(GetProfilesCountDocument, options);
        }
export type GetProfilesCountQueryHookResult = ReturnType<typeof useGetProfilesCountQuery>;
export type GetProfilesCountLazyQueryHookResult = ReturnType<typeof useGetProfilesCountLazyQuery>;
export type GetProfilesCountQueryResult = Apollo.QueryResult<GetProfilesCountQuery, GetProfilesCountQueryVariables>;
export const CreateLocationDocument = gql`
    mutation CreateLocation {
  createLocation {
    ...Location
  }
}
    ${LocationFragmentDoc}`;
export type CreateLocationMutationFn = Apollo.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: Apollo.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = Apollo.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = Apollo.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const GetLocationByIdDocument = gql`
    query GetLocationById($id: ID!) {
  findLocationByID(id: $id) {
    ...Location
  }
}
    ${LocationFragmentDoc}`;

/**
 * __useGetLocationByIdQuery__
 *
 * To run a query within a React component, call `useGetLocationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLocationByIdQuery(baseOptions: Apollo.QueryHookOptions<GetLocationByIdQuery, GetLocationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocationByIdQuery, GetLocationByIdQueryVariables>(GetLocationByIdDocument, options);
      }
export function useGetLocationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationByIdQuery, GetLocationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocationByIdQuery, GetLocationByIdQueryVariables>(GetLocationByIdDocument, options);
        }
export type GetLocationByIdQueryHookResult = ReturnType<typeof useGetLocationByIdQuery>;
export type GetLocationByIdLazyQueryHookResult = ReturnType<typeof useGetLocationByIdLazyQuery>;
export type GetLocationByIdQueryResult = Apollo.QueryResult<GetLocationByIdQuery, GetLocationByIdQueryVariables>;
export const GetLocationVoteCountsByIdsDocument = gql`
    query GetLocationVoteCountsByIds($ids: [ID!]!) {
  getLocationsByIds(ids: $ids) {
    _id
    voteCount
    locationType
  }
}
    `;

/**
 * __useGetLocationVoteCountsByIdsQuery__
 *
 * To run a query within a React component, call `useGetLocationVoteCountsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationVoteCountsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationVoteCountsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetLocationVoteCountsByIdsQuery(baseOptions: Apollo.QueryHookOptions<GetLocationVoteCountsByIdsQuery, GetLocationVoteCountsByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocationVoteCountsByIdsQuery, GetLocationVoteCountsByIdsQueryVariables>(GetLocationVoteCountsByIdsDocument, options);
      }
export function useGetLocationVoteCountsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationVoteCountsByIdsQuery, GetLocationVoteCountsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocationVoteCountsByIdsQuery, GetLocationVoteCountsByIdsQueryVariables>(GetLocationVoteCountsByIdsDocument, options);
        }
export type GetLocationVoteCountsByIdsQueryHookResult = ReturnType<typeof useGetLocationVoteCountsByIdsQuery>;
export type GetLocationVoteCountsByIdsLazyQueryHookResult = ReturnType<typeof useGetLocationVoteCountsByIdsLazyQuery>;
export type GetLocationVoteCountsByIdsQueryResult = Apollo.QueryResult<GetLocationVoteCountsByIdsQuery, GetLocationVoteCountsByIdsQueryVariables>;
export const GetLocationsByLocationTypeDocument = gql`
    query GetLocationsByLocationType($locationType: LocationType!, $size: Int, $cursor: String) {
  locationsByLocationType(
    locationType: $locationType
    _size: $size
    _cursor: $cursor
  ) {
    data {
      ...LocationItem
    }
    after
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useGetLocationsByLocationTypeQuery__
 *
 * To run a query within a React component, call `useGetLocationsByLocationTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsByLocationTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsByLocationTypeQuery({
 *   variables: {
 *      locationType: // value for 'locationType'
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetLocationsByLocationTypeQuery(baseOptions: Apollo.QueryHookOptions<GetLocationsByLocationTypeQuery, GetLocationsByLocationTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocationsByLocationTypeQuery, GetLocationsByLocationTypeQueryVariables>(GetLocationsByLocationTypeDocument, options);
      }
export function useGetLocationsByLocationTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationsByLocationTypeQuery, GetLocationsByLocationTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocationsByLocationTypeQuery, GetLocationsByLocationTypeQueryVariables>(GetLocationsByLocationTypeDocument, options);
        }
export type GetLocationsByLocationTypeQueryHookResult = ReturnType<typeof useGetLocationsByLocationTypeQuery>;
export type GetLocationsByLocationTypeLazyQueryHookResult = ReturnType<typeof useGetLocationsByLocationTypeLazyQuery>;
export type GetLocationsByLocationTypeQueryResult = Apollo.QueryResult<GetLocationsByLocationTypeQuery, GetLocationsByLocationTypeQueryVariables>;
export const MyLocationVotesDocument = gql`
    query MyLocationVotes {
  me {
    _id
    cabinTokenBalanceInt
    locationVotes(_size: 1000) {
      data {
        ...LocationVote
      }
    }
  }
}
    ${LocationVoteFragmentDoc}`;

/**
 * __useMyLocationVotesQuery__
 *
 * To run a query within a React component, call `useMyLocationVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyLocationVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyLocationVotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyLocationVotesQuery(baseOptions?: Apollo.QueryHookOptions<MyLocationVotesQuery, MyLocationVotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyLocationVotesQuery, MyLocationVotesQueryVariables>(MyLocationVotesDocument, options);
      }
export function useMyLocationVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyLocationVotesQuery, MyLocationVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyLocationVotesQuery, MyLocationVotesQueryVariables>(MyLocationVotesDocument, options);
        }
export type MyLocationVotesQueryHookResult = ReturnType<typeof useMyLocationVotesQuery>;
export type MyLocationVotesLazyQueryHookResult = ReturnType<typeof useMyLocationVotesLazyQuery>;
export type MyLocationVotesQueryResult = Apollo.QueryResult<MyLocationVotesQuery, MyLocationVotesQueryVariables>;
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($id: ID!, $data: PartialUpdateLocationInput!) {
  partialUpdateLocation(id: $id, data: $data) {
    ...Location
  }
}
    ${LocationFragmentDoc}`;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const GetOffersDocument = gql`
    query GetOffers($input: GetOffersInput!, $size: Int, $cursor: String) {
  getOffers(input: $input, _size: $size, _cursor: $cursor) {
    data {
      ...OfferItem
    }
    after
  }
}
    ${OfferItemFragmentDoc}`;

/**
 * __useGetOffersQuery__
 *
 * To run a query within a React component, call `useGetOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffersQuery({
 *   variables: {
 *      input: // value for 'input'
 *      size: // value for 'size'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetOffersQuery(baseOptions: Apollo.QueryHookOptions<GetOffersQuery, GetOffersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, options);
      }
export function useGetOffersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOffersQuery, GetOffersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, options);
        }
export type GetOffersQueryHookResult = ReturnType<typeof useGetOffersQuery>;
export type GetOffersLazyQueryHookResult = ReturnType<typeof useGetOffersLazyQuery>;
export type GetOffersQueryResult = Apollo.QueryResult<GetOffersQuery, GetOffersQueryVariables>;
export const GetOffersCountDocument = gql`
    query GetOffersCount($input: GetOffersInput!) {
  offersCount(input: $input)
}
    `;

/**
 * __useGetOffersCountQuery__
 *
 * To run a query within a React component, call `useGetOffersCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffersCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffersCountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOffersCountQuery(baseOptions: Apollo.QueryHookOptions<GetOffersCountQuery, GetOffersCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOffersCountQuery, GetOffersCountQueryVariables>(GetOffersCountDocument, options);
      }
export function useGetOffersCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOffersCountQuery, GetOffersCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOffersCountQuery, GetOffersCountQueryVariables>(GetOffersCountDocument, options);
        }
export type GetOffersCountQueryHookResult = ReturnType<typeof useGetOffersCountQuery>;
export type GetOffersCountLazyQueryHookResult = ReturnType<typeof useGetOffersCountLazyQuery>;
export type GetOffersCountQueryResult = Apollo.QueryResult<GetOffersCountQuery, GetOffersCountQueryVariables>;
export const GetProfileByIdDocument = gql`
    query GetProfileById($id: ID!) {
  findProfileByID(id: $id) {
    ...GetProfileById
  }
  activitiesByProfile(profileId: $id, _size: 2) {
    data {
      ...ActivityItem
    }
  }
}
    ${GetProfileByIdFragmentDoc}
${ActivityItemFragmentDoc}`;

/**
 * __useGetProfileByIdQuery__
 *
 * To run a query within a React component, call `useGetProfileByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfileByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProfileByIdQuery, GetProfileByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileByIdQuery, GetProfileByIdQueryVariables>(GetProfileByIdDocument, options);
      }
export function useGetProfileByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileByIdQuery, GetProfileByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileByIdQuery, GetProfileByIdQueryVariables>(GetProfileByIdDocument, options);
        }
export type GetProfileByIdQueryHookResult = ReturnType<typeof useGetProfileByIdQuery>;
export type GetProfileByIdLazyQueryHookResult = ReturnType<typeof useGetProfileByIdLazyQuery>;
export type GetProfileByIdQueryResult = Apollo.QueryResult<GetProfileByIdQuery, GetProfileByIdQueryVariables>;
export const LogTrackingEventDocument = gql`
    mutation LogTrackingEvent($key: String!) {
  logTrackingEvent(key: $key) {
    ...TrackingEvent
    profile {
      ...Me
    }
  }
}
    ${TrackingEventFragmentDoc}
${MeFragmentDoc}`;
export type LogTrackingEventMutationFn = Apollo.MutationFunction<LogTrackingEventMutation, LogTrackingEventMutationVariables>;

/**
 * __useLogTrackingEventMutation__
 *
 * To run a mutation, you first call `useLogTrackingEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogTrackingEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logTrackingEventMutation, { data, loading, error }] = useLogTrackingEventMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useLogTrackingEventMutation(baseOptions?: Apollo.MutationHookOptions<LogTrackingEventMutation, LogTrackingEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogTrackingEventMutation, LogTrackingEventMutationVariables>(LogTrackingEventDocument, options);
      }
export type LogTrackingEventMutationHookResult = ReturnType<typeof useLogTrackingEventMutation>;
export type LogTrackingEventMutationResult = Apollo.MutationResult<LogTrackingEventMutation>;
export type LogTrackingEventMutationOptions = Apollo.BaseMutationOptions<LogTrackingEventMutation, LogTrackingEventMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($id: ID!, $data: UpdateProfileInput, $roleTypes: [ProfileRoleType!]) {
  updateProfile(id: $id, data: $data, roleTypes: $roleTypes) {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *      roleTypes: // value for 'roleTypes'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const MyVouchesThisYearDocument = gql`
    query MyVouchesThisYear {
  myVouchesThisYear
}
    `;

/**
 * __useMyVouchesThisYearQuery__
 *
 * To run a query within a React component, call `useMyVouchesThisYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyVouchesThisYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyVouchesThisYearQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyVouchesThisYearQuery(baseOptions?: Apollo.QueryHookOptions<MyVouchesThisYearQuery, MyVouchesThisYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyVouchesThisYearQuery, MyVouchesThisYearQueryVariables>(MyVouchesThisYearDocument, options);
      }
export function useMyVouchesThisYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyVouchesThisYearQuery, MyVouchesThisYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyVouchesThisYearQuery, MyVouchesThisYearQueryVariables>(MyVouchesThisYearDocument, options);
        }
export type MyVouchesThisYearQueryHookResult = ReturnType<typeof useMyVouchesThisYearQuery>;
export type MyVouchesThisYearLazyQueryHookResult = ReturnType<typeof useMyVouchesThisYearLazyQuery>;
export type MyVouchesThisYearQueryResult = Apollo.QueryResult<MyVouchesThisYearQuery, MyVouchesThisYearQueryVariables>;
export const UnvouchProfileDocument = gql`
    mutation UnvouchProfile($id: ID!) {
  unvouchProfile(id: $id) {
    ...GetProfileById
  }
}
    ${GetProfileByIdFragmentDoc}`;
export type UnvouchProfileMutationFn = Apollo.MutationFunction<UnvouchProfileMutation, UnvouchProfileMutationVariables>;

/**
 * __useUnvouchProfileMutation__
 *
 * To run a mutation, you first call `useUnvouchProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnvouchProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unvouchProfileMutation, { data, loading, error }] = useUnvouchProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnvouchProfileMutation(baseOptions?: Apollo.MutationHookOptions<UnvouchProfileMutation, UnvouchProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnvouchProfileMutation, UnvouchProfileMutationVariables>(UnvouchProfileDocument, options);
      }
export type UnvouchProfileMutationHookResult = ReturnType<typeof useUnvouchProfileMutation>;
export type UnvouchProfileMutationResult = Apollo.MutationResult<UnvouchProfileMutation>;
export type UnvouchProfileMutationOptions = Apollo.BaseMutationOptions<UnvouchProfileMutation, UnvouchProfileMutationVariables>;
export const UpdateProfileCitizenshipStatusDocument = gql`
    mutation updateProfileCitizenshipStatus($id: ID!, $citizenshipStatus: CitizenshipStatus) {
  partialUpdateProfile(id: $id, data: {citizenshipStatus: $citizenshipStatus}) {
    ...GetProfileById
  }
}
    ${GetProfileByIdFragmentDoc}`;
export type UpdateProfileCitizenshipStatusMutationFn = Apollo.MutationFunction<UpdateProfileCitizenshipStatusMutation, UpdateProfileCitizenshipStatusMutationVariables>;

/**
 * __useUpdateProfileCitizenshipStatusMutation__
 *
 * To run a mutation, you first call `useUpdateProfileCitizenshipStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileCitizenshipStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileCitizenshipStatusMutation, { data, loading, error }] = useUpdateProfileCitizenshipStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      citizenshipStatus: // value for 'citizenshipStatus'
 *   },
 * });
 */
export function useUpdateProfileCitizenshipStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileCitizenshipStatusMutation, UpdateProfileCitizenshipStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileCitizenshipStatusMutation, UpdateProfileCitizenshipStatusMutationVariables>(UpdateProfileCitizenshipStatusDocument, options);
      }
export type UpdateProfileCitizenshipStatusMutationHookResult = ReturnType<typeof useUpdateProfileCitizenshipStatusMutation>;
export type UpdateProfileCitizenshipStatusMutationResult = Apollo.MutationResult<UpdateProfileCitizenshipStatusMutation>;
export type UpdateProfileCitizenshipStatusMutationOptions = Apollo.BaseMutationOptions<UpdateProfileCitizenshipStatusMutation, UpdateProfileCitizenshipStatusMutationVariables>;
export const VouchProfileDocument = gql`
    mutation VouchProfile($id: ID!) {
  vouchProfile(id: $id) {
    ...GetProfileById
  }
}
    ${GetProfileByIdFragmentDoc}`;
export type VouchProfileMutationFn = Apollo.MutationFunction<VouchProfileMutation, VouchProfileMutationVariables>;

/**
 * __useVouchProfileMutation__
 *
 * To run a mutation, you first call `useVouchProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVouchProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vouchProfileMutation, { data, loading, error }] = useVouchProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVouchProfileMutation(baseOptions?: Apollo.MutationHookOptions<VouchProfileMutation, VouchProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VouchProfileMutation, VouchProfileMutationVariables>(VouchProfileDocument, options);
      }
export type VouchProfileMutationHookResult = ReturnType<typeof useVouchProfileMutation>;
export type VouchProfileMutationResult = Apollo.MutationResult<VouchProfileMutation>;
export type VouchProfileMutationOptions = Apollo.BaseMutationOptions<VouchProfileMutation, VouchProfileMutationVariables>;