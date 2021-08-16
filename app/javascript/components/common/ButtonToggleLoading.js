import React from "react";
import { Button } from '@material-ui/core';

const ButtonToggleLoading = (props) => {
  const color = props.color || 'primary';

  return (
    <Button variant="contained" size="small" color={color}
      onClick={props.onClick} disabled={props.isLoading}
    >
      {props.children}
    </Button>
  );
};

export default ButtonToggleLoading
