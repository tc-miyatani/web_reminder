import React from "react";
import PropTypes from "prop-types";
import { Typography, Link } from "@material-ui/core";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align={props.align}>
      {'Copyright © '}
      <Link color="inherit" href="https://web-reminder.jp/">
        master@web-reminder.jp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

Copyright.propTypes = {
  align: PropTypes.string,
};

export default Copyright;
