import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import {
  Card, CardHeader, CardContent, CardActions
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrap: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '150px',
    width: '100%',
    padding: '30px',
  },
  title: {
    position: 'absolute',
    marginTop: '-1em',
    padding: '5px 20px',
    boxShadow: 'none',

  },
  content: {
    width: '100%',
    boxShadow: '0 0 2px black'
  },
}));

const OutTitleCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <Card className={classes.title}>{props.title}</Card>
      <Card className={classes.content}>{props.children}</Card>
    </div>
  );
};

export default OutTitleCard;
