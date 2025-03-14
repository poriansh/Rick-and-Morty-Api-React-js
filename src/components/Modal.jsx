import { XCircleIcon } from "@heroicons/react/20/solid";
import useClickside from "../hooks/useClickside";

function Modal({ isopen, setisopen, title, children }) {
  if (!isopen) return null;
  const ref = useClickside(() => setisopen(false));
  return (
    <div className="backdrop">
      <div ref={ref} className="modal">
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
