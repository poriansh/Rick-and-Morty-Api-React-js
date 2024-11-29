import {useState} from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import {Toaster} from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
import useLocalstorage from "./hooks/useLocalstorage";

function App() {
  const [query, setquery] = useState("");
  const {Characters} = useCharacter(query);
  const [selectId, setselectid] = useState(null);
  const [Foverit, setFoverit] = useLocalstorage("FoveritList",[]);

  const onselected = (id) => {
    setselectid((previd) => (previd === id ? null : id));
  };
  const handelAddchar = (char) => {
    setFoverit((prevchar) => [...prevchar, char]);
  };
  const handelDeletefoverite = (id) => {
    setFoverit((prevchar) => prevchar.filter((F) => F.id !== id));
  };
  const addFoveritStop = Foverit.map((char) => char.id).includes(selectId);

  return (
    <div className="app">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "#0f172a",

            color: "#fff",
          },
          icon: "❤️",
          duration: 5000,
          position: "top-center",
          iconTheme: {
            primary: "green",
            secondary: "#fff",
          },
        }}
      />
      <Navbar
        query={query}
        setquery={setquery}
        searchResult={Characters.length}
        Foverit={Foverit}
        onDeleteFoverit={handelDeletefoverite}
      />
      <Main>
        <CharacterList selectId={selectId} onselected={onselected} Characters={Characters} />
        <CharacterDetail
          selectId={selectId}
          handelAddchar={handelAddchar}
          addFoveritStop={addFoveritStop}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({children}) {
  return <div className="main">{children}</div>;
}
