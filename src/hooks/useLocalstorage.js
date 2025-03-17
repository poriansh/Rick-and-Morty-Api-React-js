import {useEffect, useState} from "react";

function useLocalstorage(key) {
  const [Foverit, setFoverit] = useState(() => JSON.parse(localStorage.getItem(key)) || []);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(Foverit));
  }, [Foverit]);
    return [Foverit, setFoverit];
}

export default useLocalstorage;
