import React from "react";
import { CircularProgress, Button } from '@material-ui/core';

const ButtonToggleLoading = (props) => {
  const color = props.color || 'primary';

  if (props.isLoading) {
    return (
      <CircularProgress />
    );
  } else {
    return (
      <Button variant="contained" size="small" color={color} onClick={props.onClick}>
        {props.children}
      </Button>
    );
  }
};

export default ButtonToggleLoading
