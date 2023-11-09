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
    mathproblemtest: MathProblemTest
    firestore: Firestore
    mathProblemById(id: String!): mathProblemById
  }

  type Firestore {
    cestinaValue: String!
    matikaValue: String!
  }
  type MathProblemTest {
  choiceone: String!
  choicetwo: String!
  choicethree: String!
  correctAnswer: String!
  difficulty: Int!   
  questions: String

}
type mathProblemById {
  id: String!
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

    mathProblemById: async (_:any, { id }: { id: string }) => {
      const kurzRef = db.doc(`slovniulohy/${id}`);
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
        choiceone,
        choicetwo,
        choicethree,
        correct,
        zadani,
      };
    },

    mathproblemtest: async () => {
        const kurzRef = db.doc('mathProblems/iQZSumSKIEfXJiY1Pm9a');
        const kurzSnapshot = await kurzRef.get();
        const difficulty = kurzSnapshot.get('difficulty');
        const choiceone = kurzSnapshot.get('choiceone');
        const choicetwo = kurzSnapshot.get('choicetwo');
        const choicethree = kurzSnapshot.get('choicethree');
        const correctAnswer = kurzSnapshot.get('correctAnswer');
        const questions = kurzSnapshot.get('questions');
        return {
          difficulty,
          choiceone,
          choicetwo,
          choicethree,
          correctAnswer,
          questions,
        };
      },

    firestore: async () => {
      const kurzRef = db.doc('kurz/xczzuQ14wBSARUEzS0zE');
      const kurzSnapshot = await kurzRef.get();
      const cestinaValue = kurzSnapshot.get('cestina');
      const matikaValue = kurzSnapshot.get('matika');

      return {
        cestinaValue,
        matikaValue,
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

// eslint-disable-next-line import/no-default-export
export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  context: async (context) => {
    const auth = context.request.headers.get('authorization');
    console.log(auth);
    return {
      user: auth ? await verifyToken(auth) : undefined,
    } as Context;
  },
});
