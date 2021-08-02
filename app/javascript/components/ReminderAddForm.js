import React from "react"
import PropTypes from "prop-types"
import TextField from '@material-ui/core/TextField';
import RepeatType from "./reminder_add/RepeatType";

const ReminderAddForm = () => {
  return (
    <React.Fragment>
      <h2>リマインダー作成フォーム</h2>
      <form noValidate autoComplete="off">

        <RepeatType />
        <br/><br/><br/>

        <TextField name="message" label="通知メッセージ" required />
      </form>
    </React.Fragment>
  );
};

export default ReminderAddForm
