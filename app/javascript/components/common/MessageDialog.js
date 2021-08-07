import React from "react"
import PropTypes from "prop-types"
import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Button
} from '@material-ui/core';

const MessageDialog = (props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.title || 'WebReminder'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary" autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MessageDialog.propTypes = {
  title   : PropTypes.string,
  msg     : PropTypes.string,
  open    : PropTypes.bool,
  onClose : PropTypes.func,
};

export default MessageDialog
