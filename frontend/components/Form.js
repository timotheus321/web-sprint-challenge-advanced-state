import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import { inputChange, submitForm, resetForm } from '../state/action-creators'

export function Form(props) {
  const { inputChange, submitForm, form, infoMessage } = props;
  const onChange = evt => {
    inputChange(evt.target.id, evt.target.value);
    //console.log("formstate after input change:", form)
  }

  const onSubmit = evt => {
    evt.preventDefault();
   // console.log("Formstate:", form)
    submitForm(form);
  }
  const allInputsFilled = form.newQuestion.trim().length > 1 && form.newTrueAnswer.trim().length > 1 && form.newFalseAnswer.trim().length > 1;
  let messageDisplay;
  if (infoMessage) {
    messageDisplay = <p>{infoMessage}</p>;
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={!allInputsFilled}>Submit new quiz</button>
      {messageDisplay}
    </form>
  )
}
const mapStateToProps = state => ({
  form: state.form,
  infoMessage: state.infoMessage
});

const mapDispatchToProps = {
  inputChange,
  submitForm,
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
