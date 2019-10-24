import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

function App(){
  const [counter, setCounter] = useState(42);
  const incrementCounter = ()=>{ setCounter(counter+1);

  };
  return (
    <div>
      <Button onClickFunction={incrementCounter}/>
      <Display message={counter}/>
    </div>
  );
}

function Display(props){
  return(
    <div>{props.message}</div>
  );
}
function Button(props){
  return(
    <button onClick={props.onClickFunction}>+1</button>
  );
}

render(<App />, document.getElementById('root'));
