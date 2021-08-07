import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const NotificationTime = (props) => {
  const classes = useStyles();

  const handleChange = time => props.onChange({notification_time: time});

  return (
    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin='normal'
          id='notification-time'
          name='reminder[notification_time]'
          format="HH:mm"
          label='通知時間'
          value={props.reminder.notification_time}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

NotificationTime.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
};

export default NotificationTime
