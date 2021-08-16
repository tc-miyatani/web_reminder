import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';
import { Label } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  messageTitle: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.54)',
    margin: '10px 0',
  },
  message: {
    padding: '10px',
    width: '100%',
    minHeight: '50px',
  },
}));

const MyTextField = (props) => {
  const classes = useStyles();

  const [showMessageLabel, setShowMessageLabel] = useState(!!props.defaultValue);
  const messageRef = useRef();
  useEffect(() => {
    console.log(props);
    const messageElm = messageRef.current;
    console.log(messageRef);
    if (!messageElm) { return; }
    let is_empty = true;
    messageElm.addEventListener('focus', ()=> {
      messageElm.placeholder = '';
      setShowMessageLabel(true);
    });
    messageElm.addEventListener('blur', ()=> {
      console.log(is_empty);
      if (is_empty) {
        messageElm.placeholder = props.placeholder;
        setShowMessageLabel(false);
      } else {
        setShowMessageLabel(true);
      }
    });
    messageElm.addEventListener('input', ()=> {
      is_empty = messageElm.value.length == 0;
    });
  }, []);

  return (
    <>
      {showMessageLabel &&
        <div className={classes.messageTitle}>
          {props['aria-label']}
        </div>
      }
      <TextareaAutosize maxRows={props.maxRows||10} required={props.required}
        className={classes.message}
        name={props.name}
        defaultValue={props.defaultValue} ref={messageRef}
        placeholder={props.placeholder}
        aria-label={props['aria-label']}
      />
    </>
  );
}
MyTextField.propTypes = {
  name : PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  'aria-label': PropTypes.string,
  require: PropTypes.bool,
  maxRows: PropTypes.number,
};

export default MyTextField;
