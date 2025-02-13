import { useState } from 'react';

const useStore = () => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const clearInput = () => setInputValue('');

  const removeLastCharacter = () => {
    setInputValue((prev) => {
      const newValue = prev.slice(0, -1);
      updateHistory(newValue);
      return newValue;
    });
  };

  const updateHistory = (newValue) => {
    // Update history only if the new value is different from the last one
    if (currentIndex === -1 || history[currentIndex] !== newValue) {
      const newHistory = [...history.slice(0, currentIndex + 1), newValue];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
  };

  const undo = () => {
    if (canUndo) {
      // If at the first item, just keep the input value unchanged
      if (currentIndex === 0) {
        setInputValue(history[0]); // Keep the first value
      } else {
        setCurrentIndex((prev) => prev - 1);
        setInputValue(history[currentIndex - 1]);
      }
    }
  };

  const redo = () => {
    if (canRedo) {
      setCurrentIndex((prev) => prev + 1);
      setInputValue(history[currentIndex + 1]);
    }
  };

  const canUndo = currentIndex >= 0; // Allow undo even at zero index
  const canRedo = currentIndex < history.length - 1;

  return {
    inputValue,
    isDarkMode,
    setInputValue: (value) => {
      setInputValue(value);
      updateHistory(value); // Update history whenever input value changes
    },
    toggleDarkMode,
    clearInput,
    removeLastCharacter,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};

export default useStore;