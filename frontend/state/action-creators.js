import axios from 'axios';
import { MOVE_CLOCKWISE, 
        MOVE_COUNTERCLOCKWISE, 
        SET_QUIZ_INTO_STATE, 
        SET_SELECTED_ANSWER, 
        SET_INFO_MESSAGE, 
        INPUT_CHANGE,
        RESET_FORM,
        SUBMIT_FORM_SUCCESS,
        SUBMIT_FORM_FAILURE } from './action-types'
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE};
 }

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE};
 }

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer};
 }

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message};
 }

export function setQuiz(quiz) {
  return {type: SET_QUIZ_INTO_STATE, payload: quiz };
 }

export function inputChange(name, value) {
  return {type: INPUT_CHANGE, payload: { name, value} };
 }

export function resetForm() {
  return { type: RESET_FORM};
 }

// ❗ Async action creators
export function fetchQuiz() {
  return async function (dispatch) {
    dispatch(setQuiz(null));
    axios.get('http://localhost:9000/api/quiz/next')
    .then(response => {
      dispatch(setQuiz(response.data));
    })
    .catch(error => {
      console.error("Error fetching quiz: ", error);
      dispatch(setMessage("An error occurred while fetching the quiz."));
    });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer)
    .then(response => {
      dispatch(resetSelectedAnswer());
      dispatch(setMessage(response.data.message));
      dispatch(fetchQuiz());
    })
    .catch(error => {
      console.error("Error posting answer: ", error);
      dispatch(setMessage("An error occurred while posting the answer."));
    });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(newQuiz) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', newQuiz)
    .then(response => {
      dispatch(setMessage("New quiz successfully posted."));
      dispatch(resetForm());
    })
    .catch(error => {
      console.error("Error posting new quiz: ", error);
      dispatch(setMessage("An error occurred while posting the new quiz."));
    });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
export const submitForm = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://your-quiz-api-endpoint.com/quizzes', formData);
      
      dispatch({ type: SUBMIT_FORM_SUCCESS, payload: response.data });
      
      // Dispatch any other actions as needed
      
    } catch (error) {
      dispatch({ type: SUBMIT_FORM_FAILURE, error });
      // Handle the error properly
    }
  };
};
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
export function submitAnswer(quiz_id, answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer })
    .then(response => {
      dispatch(selectAnswer(null));  // Reset selected answer
      dispatch(setMessage(response.data.message));
      dispatch(fetchQuiz());
    })
    .catch(error => {
      console.error("Error posting answer: ", error);
      dispatch(setMessage("An error occurred while posting the answer."));
    });
  }
}
