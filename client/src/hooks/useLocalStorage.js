import { useState } from "react"

const useLocalStorage = (key, initialValue) => {

  const [storedValue, setStoredValue] = useState(() => {
    const value = window.localStorage.getItem(key);

    try {
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      console.error(e);
      //alert is useless and will confuse a user, but amuses Josh, and I like it. Plus, check out this whole try catch bit for working around a corrupted localStorage without clearing it out (which can crankify other programmers if theyre reusing this server domain on other projects. Have I mentioned ,y undying love for my angel mentor yet?).
      alert(`You're local Storage is corrupted, but we will work for now. ${e.message}`);
      return initialValue
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  return [storedValue, setValue]
};

export default useLocalStorage;