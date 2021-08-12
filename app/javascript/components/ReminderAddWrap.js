import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import ReminderAddForm from "ReminderAddForm";

const useStyles = makeStyles(() => ({
  wrap: {
    marginBottom: '20px',
  }
}));

const ReminderAddWrap = () => {
  const classes = useStyles();

  const [reminder, setReminder] = useState({
    id: null,
    message: null,
    notification_date: null,
    notification_time: null,
    weekdays: null,
    repeat_type_id: null,
  });
  const handleChange = obj => setReminder({...reminder, ...obj});

  return (
    <div className={classes.wrap}>
      <ReminderAddForm reminder={reminder} onChange={handleChange} />
    </div>
  );
};

export default ReminderAddWrap
