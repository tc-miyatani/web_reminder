import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  actions: {
    justifyContent: 'center',
  },
}));

const SimpleLayout = (props) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.container}>
        <CardHeader title={props.title||''}  align="center" />
        <CardContent>
          {props.content}
        </CardContent>
        <CardActions className={classes.actions}>
          {props.action}
        </CardActions>
      </Card>
    </>
  );
};

SimpleLayout.propTypes = {
  title: PropTypes.string,
  content: PropTypes.element,
  action: PropTypes.element,
};

export default SimpleLayout;
