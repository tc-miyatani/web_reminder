import React, { useState, useEffect } from "react"

import axios from 'modules/axios_with_csrf';
import ReminderEditForm from "ReminderEditForm";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const handleChange = (reminder_id, data) => {
    const new_reminders = reminders.map(reminder => {
      const change_data = (reminder.id === reminder_id) ? data : {};
      return {...reminder, ...change_data};
    });
    setReminders(new_reminders);
  };
  const handleDelete = reminder_id => {
    const new_reminders = reminders.filter(reminder => reminder.id != reminder_id);
    setReminders(new_reminders);
  };

  useEffect(() => {
    console.log('mounted!!!');

    axios.get('/api/reminders')
      .then(res => {
        const reminder_list = res.data.reminders.map(reminder => {
          reminder.notification_time = reminder.notification_datetime;
          reminder.notification_date = reminder.notification_datetime;
          return reminder;
        });
        console.log(reminder_list);
        setReminders(reminder_list);
      })
      .catch(error => {
        alert('申し訳ございません、エラーが発生しました。ページを再読み込みしてください。');
        console.log('_$$_AXIOS_ERROR_$$_', error);
      });

    return () => console.log('unmounted!!!');
  }, []);

  return (
      <>
        { reminders.map(reminder => {
          return (
            <ReminderEditForm key={reminder.id} reminder={reminder}
                              onChange={handleChange} onDelete={handleDelete} />
          );
        }) }
      </>
  );
}

export default ReminderList
