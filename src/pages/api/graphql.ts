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
    getUserById(uid: String!): User
  }

  type Mutation {
    updateNumberOfExercises(uid: String!, newNumberOfExercises: String!, newNumberOfExercisesInTest: String!): User
  }

  type mathProblemById {
    id: String!
    collectionName: String!
    choiceone: String
    choicetwo: String
    choicethree: String
    correct: String
    zadani: String
    question: String!
  }

  type User {
    uid: String!
    email: String!
    displayName: String
    numberofexercises: String
    numberofexercisesintest: String
    score: String
  }
`;

const db = firestore();

const resolvers = {
  Query: {
    mathProblemById: async (
      _: any,
      { collectionName, id }: { collectionName: string; id: string }
    ) => {
      const docRef = db.doc(`${collectionName}/${id}`);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        throw new Error('Question not found');
      }

      const choiceone = docSnapshot.get('choiceone');
      const choicetwo = docSnapshot.get('choicetwo');
      const choicethree = docSnapshot.get('choicethree');
      const correct = docSnapshot.get('correct');
      const zadani = docSnapshot.get('zadani');

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
    getUserById: async (
      _: any,
      { uid }: { uid: string }
    ) => {
      const userDocRef = db.doc(`users/${uid}`);
      const userDocSnapshot = await userDocRef.get();

      if (!userDocSnapshot.exists) {
        throw new Error('User not found');
      }

      const userData = userDocSnapshot.data();
      return {
        uid,
        ...userData,
      };
    },
  },

  Mutation: {
    updateNumberOfExercises: async (
      _: any,
      { uid, newNumberOfExercises, newNumberOfExercisesInTest }: { uid: string; newNumberOfExercises: string, newNumberOfExercisesInTest:string }
    ) => {
      const userDocRef = db.doc(`users/${uid}`);

      try {
        // Update the field in the document
        await userDocRef.update({
          numberofexercises: newNumberOfExercises,
          numberofexercisesintest: newNumberOfExercisesInTest,
        });

        // Fetch and return the updated user data
        const userDocSnapshot = await userDocRef.get();
        const userData = userDocSnapshot.data();
        return {
          uid,
          ...userData,
        };
      } catch (error:any) {
        throw new Error(`Error updating number of exercises: ${error.message}`);
      }
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
