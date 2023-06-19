import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function getClassName(i, wheelState) {
  const adjustedState = wheelState >= 0 ? wheelState : 6 + (wheelState % 6);
  return i === adjustedState % 6 ? 'cog active' : 'cog';
}

function getCogLetter(i, wheelState) {
  const adjustedState = wheelState >= 0 ? wheelState : 6 + (wheelState % 6);
  return i === adjustedState % 6 ? 'B' : '';
}

export default function Wheel(props) {
  const dispatch = useDispatch();
  const wheelState = useSelector(state => state.wheel);

  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div className={getClassName(i, wheelState)} style={{ "--i": i }}>
            {getCogLetter(i, wheelState)}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => dispatch(moveCounterClockwise())}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => dispatch(moveClockwise())}>Clockwise</button>
      </div>
    </div>
  );
}

