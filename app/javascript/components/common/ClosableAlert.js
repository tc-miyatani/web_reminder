import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  hidden: {
    display: 'none',
  },
  alert: {
    margin: '20px auto',
    maxWidth: '800px',
  },
}));

const ClosableAlert = (props) => {
  const classes = useStyles();

  const [show, setShow] = useState(true);
  const handleClose = () =>  setShow(false);

  return (
    <>
      <Alert variant="filled" severity={props.severity}
        className={show ? classes.alert : classes.hidden}
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            { props.buttonText || '閉じる' }
          </Button>
        }
      >
        {/* <AlertTitle>Error</AlertTitle> */}
        { props.message }
      </Alert>
    </>
  );
};

ClosableAlert.propTypes = {
  severity   : PropTypes.string, // error, warning, info, success
  buttonText : PropTypes.string,
};

export default ClosableAlert
