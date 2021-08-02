import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import RepeatType from "./reminder_add/RepeatType";
import NotificationDate from "./reminder_add/NotificationDate";
import NotificationTime from "./reminder_add/NotificationTime";
import NotificationWeekdays from "./reminder_add/NotificationWeekdays";

const ReminderAddForm = () => {
  return (
    <React.Fragment>
      <h2>リマインダー作成フォーム</h2>
      <form noValidate autoComplete="off">
        <RepeatType /><br />
        <NotificationDate />
        <NotificationTime />
        <NotificationWeekdays />
        <TextField name="message" label="通知メッセージ" required />
      </form>
    </React.Fragment>
  );
};

export default ReminderAddForm
