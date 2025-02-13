import './App.css';
import Draggable from 'react-draggable';
import useStore from './useStore';
import { evaluate } from 'mathjs';
import { useEffect, useState } from 'react';

function App() {
  const {
    inputValue,
    isDarkMode,
    setInputValue,
    toggleDarkMode,
    clearInput,
    removeLastCharacter,
    undo,
    redo,
    canUndo, 
    canRedo, 
  } = useStore();

  // Define the warning state
  const [warning, setWarning] = useState('');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleButtonClick = (value) => {
    setInputValue(inputValue + value);
  };

  const calculateResult = () => {
    try {
      const result = evaluate(inputValue);
      setInputValue(result.toString());
    } catch (error) {
      setInputValue('Error');
    }
  };

  const handleUndo = () => {
    if (canUndo) {
      undo();
      setWarning(''); 
    } else {
      setWarning('No actions to undo.');
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      redo();
      setWarning(''); 
    } else {
      setWarning('No actions to redo.');
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'} min-h-screen flex flex-col items-center justify-center`}>
      <div className="calendar w-full h-10 bg-gray-400 flex items-center justify-center">
        <h1 className="text-xl font-bold">Calculator</h1>
      </div>
      
      <div className="toggle-container my-4">
        <button className="toggle-mode py-2 px-4 rounded bg-blue-500 text-white" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="cal w-11/12 md:w-2/3 lg:w-1/3 text-center flex items-center justify-center my-4">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter value for operation"
          className={`border rounded px-2 py-2 w-full text-right h-20 input-field ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          readOnly
        />
      </div>

      {/* Display warning message if it exists */}
      {warning && <div className="warning-message text-red-500">{warning}</div>}

      <div className="names w-11/12 md:w-2/3 lg:w-1/3 flex flex-col items-center">
        <div className="button-row grid grid-cols-3 gap-2">
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('1')}>1</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('2')}>2</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('3')}>3</button></Draggable>
        </div>
        <div className="button-row grid grid-cols-3 gap-2">
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('4')}>4</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('5')}>5</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('6')}>6</button></Draggable>
        </div>
        <div className="button-row grid grid-cols-3 gap-2">
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('7')}>7</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('8')}>8</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('9')}>9</button></Draggable>
        </div>
        <div className="button-row grid grid-cols-3 gap-2">
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('0')}>0</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('.')}>.</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={() => handleButtonClick('00')}>00</button></Draggable>
        </div>
        <div className="button-row grid grid-cols-3 gap-2">
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-green-500 transition duration-300" onClick={() => handleButtonClick('+')}>+</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-green-500 transition duration-300" onClick={() => handleButtonClick('-')}>-</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-green-500 transition duration-300" onClick={() => handleButtonClick('*')}>*</button></Draggable>
        </div>
        <div className="button-row grid grid-cols-3 gap-2">
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-green-500 transition duration-300" onClick={() => handleButtonClick('/')}>/</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={calculateResult}>=</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-yellow-500 transition duration-300" onClick={clearInput}>C</button></Draggable>
        </div>
        <div className="button-row grid grid-cols-3 gap-2">
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-red-500 transition duration-300" onClick={removeLastCharacter}>del</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-blue-500 transition duration-300" onClick={handleUndo}>Undo</button></Draggable>
          <Draggable><button className="w-12 h-12 m-1 border border-gray-700 hover:bg-blue-500 transition duration-300" onClick={handleRedo}>Redo</button></Draggable>
        </div>
      </div>
    </div>
  );
}

export default App;
