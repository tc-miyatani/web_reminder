import React, { useState } from "react"

import ReminderAddForm from "ReminderAddForm";

const ReminderAddWrap = () => {
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
    <>
      <ReminderAddForm reminder={reminder} onChange={handleChange} />
    </>
  );
};

export default ReminderAddWrap
