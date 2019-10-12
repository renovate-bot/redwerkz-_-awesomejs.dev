import { ApolloContext } from '@nodepack/plugin-apollo'
import { ExpressContext } from '@nodepack/plugin-express'
import { PassportContext, PassportUser } from '@nodepack/plugin-passport'
import { Client as FaunaClient } from 'faunadb'
import { Options } from 'npm-registry-fetch'
import Octokit from '@octokit/rest'
import { Client as AlgoliaClient } from 'algoliasearch'
import DbConfig from '../config/db'
import GithubConfig from '../config/github'
import ApolloConfig from '../config/apollo'

export interface Config {
  db: typeof DbConfig
  github: typeof GithubConfig
  apollo: typeof ApolloConfig
}

export interface User extends PassportUser {
  projectTypeBookmarks?: string[]
}

export interface Context extends
  Omit<ApolloContext, 'user'>,
  ExpressContext,
  PassportContext {
  config: Config
  user: User
  db: FaunaClient
  npm: (url: string, opts?: Options) => Promise<any>,
  github: Octokit
  algolia: AlgoliaClient
}
