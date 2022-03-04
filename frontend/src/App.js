import { useState } from 'react';
import './App.css';
import { getSumAndCheck, getCheckPrime } from './services/primenumber_service';

let timer = null;

const App = () => {
  const [result, setResult] = useState({ type: null, value: '' });

  const checkInput = (value) => {
    if (value === '') {
      clearTimeout(timer);
      setResult({ type: null, value: '' });
      return;
    }

    let isnum = /^(?!.*([,])\1)[0-9][0-9,]*$/.test(value);
    if (!isnum) {
      setResult({
        type: 'error',
        value:
          'start with number, only numbers and numbers separated with , allowed!',
      });
    } else if (value.includes(',')) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        getSumAndCheck(value).then((result) => {
          setResult(result);
        });
      }, 500);
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        getCheckPrime(value).then((result) => {
          setResult(result);
        });
      }, 500);
    }
  };

  return (
    <div className='container'>
      <div className='main'>
        <div>
          <h1 className='heading'>The Prime Number Checker</h1>
        </div>

        <div className='inputForm'>
          Enter single value or multiple values separated with comma:
          <input
            className='inputField'
            type='text'
            onChange={(e) => checkInput(e.target.value)}
          />
        </div>
        <div className={result.type}>{result.type && result.value}</div>
      </div>
    </div>
  );
};

export default App;
