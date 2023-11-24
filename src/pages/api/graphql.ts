import { DecodedIdToken } from 'firebase-admin/auth';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';

import { firestore } from '@/server/firebase-admin-config';
import { verifyToken } from '@/server/verify-token';

type Context = {
  user?: DecodedIdToken | undefined;
};

const typeDefs = gql`
  type Query {
    mathProblemById(collectionName: String!, id: String!): mathProblemById
  }
  type mathProblemById {
    id: String!
    collectionName: String!
    choiceone: String!
    choicetwo: String!
    choicethree: String!
    correct: String!
    zadani: String
  }
`;

const db = firestore();

const resolvers = {
  Query: {
    mathProblemById: async (
      _: any,
      { collectionName, id }: { collectionName: string; id: string }
    ) => {
      const kurzRef = db.doc(`${collectionName}/${id}`);
      const kurzSnapshot = await kurzRef.get();

      if (!kurzSnapshot.exists) {
        throw new Error('Math problem not found');
      }

      const choiceone = kurzSnapshot.get('choiceone');
      const choicetwo = kurzSnapshot.get('choicetwo');
      const choicethree = kurzSnapshot.get('choicethree');
      const correct = kurzSnapshot.get('correct');
      const zadani = kurzSnapshot.get('zadani');

      return {
        id,
        collectionName,
        choiceone,
        choicetwo,
        choicethree,
        correct,
        zadani,
      };
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: async (context) => {
    const auth = context.request.headers.get('authorization');
    console.log(auth);
    return {
      user: auth ? await verifyToken(auth) : undefined,
    } as Context;
  },
});
