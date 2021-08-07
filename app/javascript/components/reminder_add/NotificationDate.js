import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const NotificationDate = (props) => {
  const classes = useStyles();

  const handleChange = date => {
    props.onChange({notification_date: date});
  };
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.container}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        margin="normal"
        id="notification-date"
        name="reminder[notification_date]"
        label="通知日"
        value={props.reminder.notification_date}
        onChange={handleChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

NotificationDate.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
};

export default NotificationDate
