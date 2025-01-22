import {XCircleIcon} from "@heroicons/react/20/solid";

function Modal({ isopen, setisopen, title, children }) {
    if (!isopen) return null;
  return (
    <div className="backdrop" onClick={() => setisopen(false)}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => setisopen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
