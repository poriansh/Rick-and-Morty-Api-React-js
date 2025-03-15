import axios from 'axios';
import  { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function useCharacterId(selectId) {
  const [character, setCharacter] = useState(null);
  const [episodes, setepisodes] = useState(null);
  const [isloading, setloading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        setCharacter(null);
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${selectId}`);

        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        console.log(episodeId);

        const {data: episodeData} = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setepisodes([episodeData].flat());
        setCharacter(data);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setloading(false);
      }
    }
    if (selectId) fetchData();
  }, [selectId]);
  return {character, episodes, isloading};
}

export default useCharacterId
