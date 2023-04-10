/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query GetBadges($raftId: String!, $startBlock: Int!, $endBlock: Int!) {\n  badges(\n    first: 1000\n    where: {spec_: {raft: $raftId}, _change_block: {number_gte: $startBlock}}\n    block: {number: $endBlock}\n  ) {\n    id\n    owner\n    createdAt\n    spec {\n      id\n      metadata {\n        name\n        description\n        image\n      }\n    }\n  }\n}": types.GetBadgesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetBadges($raftId: String!, $startBlock: Int!, $endBlock: Int!) {\n  badges(\n    first: 1000\n    where: {spec_: {raft: $raftId}, _change_block: {number_gte: $startBlock}}\n    block: {number: $endBlock}\n  ) {\n    id\n    owner\n    createdAt\n    spec {\n      id\n      metadata {\n        name\n        description\n        image\n      }\n    }\n  }\n}"): (typeof documents)["query GetBadges($raftId: String!, $startBlock: Int!, $endBlock: Int!) {\n  badges(\n    first: 1000\n    where: {spec_: {raft: $raftId}, _change_block: {number_gte: $startBlock}}\n    block: {number: $endBlock}\n  ) {\n    id\n    owner\n    createdAt\n    spec {\n      id\n      metadata {\n        name\n        description\n        image\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;