import {HeartIcon} from "@heroicons/react/24/outline";
import Modal from "./Modal";
import {Character} from "./CharacterList";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
function Navbar({searchResult, query, setquery, Foverit, onDeleteFoverit}) {
  const [isopen, setisopen] = useState(false);
  return (
    <>
      <Modal isopen={isopen} setisopen={setisopen} title={"List of Foverit"}>
        {Foverit.map((item) => (
          <Character key={item.id} item={item}>
            <button>
              <TrashIcon className="icon red" onClick={() => onDeleteFoverit(item.id)} />
            </button>
          </Character>
        ))}
      </Modal>
      <nav className="navbar">
        <div className="navbar__logo">Loogo 😍</div>
        <input
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value)}
          className="text-field"
          placeholder="search..."
        />
        <div className="navbar__result">{searchResult} Character</div>
        <button className="heart" onClick={() => setisopen((is) => !is)}>
          <HeartIcon className="icon" />
          <span className="badge">{Foverit.length}</span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
