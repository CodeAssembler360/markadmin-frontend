import React from "react";
import { Popover as MuiPopover } from "@mui/material";
import { useState } from "react";

function Popover() {
  const [open, setOpen] = useState(false);
  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
        
    </MuiPopover>
  );
}

export default Popover;
