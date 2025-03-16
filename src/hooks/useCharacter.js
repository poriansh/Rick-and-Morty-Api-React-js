import axios from "axios";
import {useEffect, useState} from "react";
function useCharacter(query) {
  const contoroler = new AbortController();
  const signal = contoroler.signal;
  const [Characters, setCharacter] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`, {
          signal,
        });
        setCharacter(data.results.slice(0, 5));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacter([]);
        }
      }
    }
    fetchData();
    return () => {
      contoroler.abort();
    };
  }, [query]);
  return {Characters};
}

export default useCharacter;
