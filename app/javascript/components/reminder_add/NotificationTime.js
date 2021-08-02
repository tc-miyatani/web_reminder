import React from "react"
import { makeStyles } from '@material-ui/core/styles';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const NotificationTime = () => {
  const classes = useStyles();

  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin='normal'
          id='notification-time'
          name='notification-time'
          label='通知時間'
          value={selectedTime}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default NotificationTime
