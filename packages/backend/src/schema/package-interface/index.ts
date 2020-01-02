import gql from 'graphql-tag'
import { Resolvers } from '@/generated/schema'

export const typeDefs = gql`
interface PackageInterface {
  id: ID!
  name: String!
  info: PackageInfo!
}

type Package implements PackageInterface {
  id: ID!
  name: String!
  info: PackageInfo!
}

type PackageProposal implements PackageInterface {
  id: ID!
  name: String!
  info: PackageInfo!
}

type PackageMaintainer {
  name: String
  email: String
  avatar: String
}

type PackageInfo {
  tags: [String!]!
}

input PackageInfoInput {
  tags: [String!]!
}
`

export const resolvers: Resolvers = {
  PackageInterface: {
    __resolveType: (pkg: any) => {
      if (pkg.ref.collection.id === 'Packages') { return 'Package' }
      if (pkg.ref.collection.id === 'PackageProposals') { return 'PackageProposal' }
      return null
    },
  },
}
