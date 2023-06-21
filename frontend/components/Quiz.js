import React, { useEffect} from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, postAnswer, submitAnswer, selectAnswer } from '../state/action-creators';
import { connect } from "react-redux";

 function Quiz(props) {
  const {  quiz, selectedAnswer, selectAnswer} = props;
  //const dispatch = useDispatch();
  useEffect(() => {
    if (!quiz) {
      props.fetchQuiz();
    }
  }, [props.fetchQuiz, quiz]) 
  

// return (
//   <div id="wrapper">
//     {
//       // If quiz is not null, render the quiz, otherwise render "Loading next quiz..."
//       quiz ? (
//         <>
//           <h2>{quiz.question}</h2>
//           <div id="quizAnswers">
//             <div className="answer selected">
//               {quiz.answers[0].text}
//               <button>
//                 SELECTED
//               </button>
//             </div>

//             <div className="answer">
//               {quiz.answers[1].text}
//               <button>
//                 Select
//               </button>
//             </div>
//           </div>

//           <button id="submitAnswerBtn" disabled={!selectedAnswer}>Submit answer</button>
//         </>
//       ) : 'Loading next quiz...'
//     }
//   </div>
// )
return (
  <div id="wrapper">
    
      {
        // If quiz is not null, render the quiz, otherwise render "Loading next quiz..."
        quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            {quiz.answers.map((answer, index) => (
              <div key={index} className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}onClick={() => selectAnswer(quiz.answers[index].answer_id)}>
                {answer.text}
                <button onClick={() => props.selectAnswer(answer.answer_id)}>
                  {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>
          <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={() => props.submitAnswer(quiz.quiz_id, selectedAnswer)}>Submit answer</button>
        </>
      ) : 'Loading next quiz...'
    }
  </div>
);


  }
const mapstatetoprops = (state) => {
  return {
          quiz: state.quiz,
          // id: state.submitAnswer
          selectedAnswer: state.selectedAnswer,
          infoMessage: state.infoMessage
         
  }
}
const mapDispatchToProps = {
  fetchQuiz,
  postAnswer,
  submitAnswer,
  selectAnswer
};
export default connect(mapstatetoprops, mapDispatchToProps)(Quiz)