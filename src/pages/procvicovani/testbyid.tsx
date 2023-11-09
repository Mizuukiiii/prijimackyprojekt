import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MATH_PROBLEM_BY_ID = gql`
  query GetMathProblemById($id: String!) {
    mathProblemById(id: $id) {
      id
      choiceone,
      choicetwo,
      choicethree,
      correct,
      zadani,
    }
  }
`;

const MathProblemComponent = () => {
  const mathProblemId = "2"; // Replace this with the actual math problem ID

  const { loading, error, data } = useQuery(GET_MATH_PROBLEM_BY_ID, {
    variables: { id: mathProblemId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const mathProblem = data.mathProblemById;

  return (
    <div>
      {/* <h2>Math Problem ID: {mathProblem.id}</h2> */}
      <p>Choice One: {mathProblem.choiceone}</p>
      <p>Choice Two: {mathProblem.choicetwo}</p>
      <p>Choice Three: {mathProblem.choicethree}</p>
      <p>Correct Answer: {mathProblem.correct}</p>
      <p>Questions: {mathProblem.zadani}</p>
    </div>
  );
};

export default MathProblemComponent;
