import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Copyright = (props) => {
  const classes = useStyles();

  return (
    <Typography variant="body2" color="textSecondary"
      align={props.align} className={classes.wrap}
    >
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
