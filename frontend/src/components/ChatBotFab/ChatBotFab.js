import React from "react";
import { Fab, Zoom } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const ChatBotFab = () => {
  return (
    <div className="botContainer">
      <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
        <Fab color="primary" size="large">
          <ContactSupportIcon />
        </Fab>
      </Zoom>
    </div>
  );
};

export default ChatBotFab;
