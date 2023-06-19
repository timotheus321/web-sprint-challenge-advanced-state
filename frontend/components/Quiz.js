import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, postAnswer, submitAnswer } from '../state/action-creators';
import { connect } from "react-redux";

 function Quiz(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuiz()) // Dispatch the fetchQuiz action when the component mounts
  }, [dispatch]) 
  const quiz = useSelector(state => state.quiz);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                A function
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
    }

//   
const mapstatetoprops = (state) => {
  return {quiz: state.quiz,
          id: state.submitAnswer
  }
}
export default connect(mapstatetoprops, {fetchQuiz, postAnswer, submitAnswer})(Quiz)