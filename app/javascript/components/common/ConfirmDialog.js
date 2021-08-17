import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const [handleAgree, setHandleAgree] = useState(()=>{});
  const [handleDisagree, setHandleDisagree] = useState(()=>{});
  const [handleClose, setHandleClose] = useState(()=>{});
  const resetHandle = () => {
    setHandleAgree(()=>{});
    setHandleDisagree(()=>{});
    setHandleClose(()=>{});
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    confirm: () => new Promise((resolve, reject) => {
      setHandleAgree(() => () => {
        resetHandle();
        resolve(true);
      });
      setHandleDisagree(() => () => {
        resetHandle();
        resolve(false);
      });
      setHandleDisagree(() => () => {
        resetHandle();
        resolve(false);
      });
      setOpen(true);
    }),
  }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title" align="center">{props.title||'確認'}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.message||'本当によろしいですか？'}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDisagree} color={props.disagree_color||'primary'}>
        {props.disagree_text||'いいえ'}
      </Button>
      <Button onClick={handleAgree} color={props.agree_color||'primary'} autoFocus>
        {props.agree_text||'はい'}
      </Button>
    </DialogActions>
  </Dialog>
  );
});

ConfirmDialog.propTypes = {
  title    : PropTypes.string,
  message  : PropTypes.string,
  disagree_text  : PropTypes.string,
  disagree_color : PropTypes.string,
  agree_text     : PropTypes.string,
  agree_color    : PropTypes.string,
};

export default ConfirmDialog;
