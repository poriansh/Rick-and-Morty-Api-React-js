import {useEffect, useState} from "react";

function useLocalstorage(key,initstate) {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) || initstate);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
    return [value,setValue]
}

export default useLocalstorage;
