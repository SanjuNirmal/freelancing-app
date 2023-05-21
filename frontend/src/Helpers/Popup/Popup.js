import React, { useEffect } from "react";
import "./styles.css";

function Popup(props) {
  const closeHandler = () => {
    props.setTrigger(false);
    window.location.reload(false);
  };

  useEffect(() => {
    setTimeout(() => {
      props.setTrigger(false);
    }, 3000);
  }, [props]);

  return props.trigger ? (
    <div className="popup">
      <div className="popper-inner">
        <button
          className="close-btn"
          onClick={() => {
            closeHandler();
          }}
        >
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
