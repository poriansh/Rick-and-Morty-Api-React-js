import {ArrowUpCircleIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
function CharacterDetail({selectId, handelAddchar, addFoveritStop}) {
  const [character, setCharacter] = useState(null);
  const [episodes, setepisodes] = useState(null);
  const [isloading, setloading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        setCharacter(null);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectId}`);

        const episodeId = data.episode.map((e) => e.split("/").at(-1));

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
  if (isloading)
    return (
      <div className="empty" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
        <Loader />
      </div>
    );
  if (character === null || selectId === null) {
    return (

       <div
      className="empty"
        style={{
         
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        select character
      </div>
    );
  }
  return (
    <div className="caracter-wrraper">
      <Characterinfo
        character={character}
        handelAddchar={handelAddchar}
        addFoveritStop={addFoveritStop}
      />
      <Characterepisode episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function Characterinfo({character, handelAddchar, addFoveritStop}) {
  return (
    <div className="character-detail">
      <img src={character.image} alt="" className="character-detail__img" />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩"}</span>
          <span>{character.name}</span>
        </h3>
        <div className="info ">
          <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
          <span> {character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last known location</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {addFoveritStop ? (
            <p>Allready character add ✅</p>
          ) : (
            <button onClick={() => handelAddchar(character)} className="btn btn--primary">
              {" "}
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Characterepisode({episodes}) {
  const [sortby, setsortby] = useState(true);
  let sortedEpisode;
  if (sortby) {
    sortedEpisode = [...episodes].sort((a, b) => new Date(a.created) - new Date(b.created));
  } else {
    sortedEpisode = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created));
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of episodes</h2>
        <button onClick={() => setsortby((is) => !is)}>
          <ArrowUpCircleIcon className={`icon ${sortby ? "" : "icon--active"}`} />
        </button>
      </div>
      <ul>
        {sortedEpisode.map((item) => (
          <li key={item.id}>
            <div>
              {String(item.id).padStart(2, "0")} {item.episode} : <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
