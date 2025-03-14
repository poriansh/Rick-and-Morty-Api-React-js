import {EyeSlashIcon} from "@heroicons/react/24/outline";
import {EyeIcon} from "@heroicons/react/24/outline";

function CharacterList({Characters, onselected, selectId}) {
  if (!Characters.length)
    return (
      <p
        style={{
          color: "#FFf",
        }}
      >
        کاراکتر وجود ندارد
      </p>
    );
  return (
    <div className="characters-list">
      {Characters.map((item) => (
        <Character selectId={selectId} onselected={onselected} key={item.id} item={item}>
          <button onClick={() => onselected(item.id)} className="icon red">
            {selectId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;

export function Character({item, children}) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👨" : "👩"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
}
