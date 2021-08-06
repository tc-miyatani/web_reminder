import React from "react"

import NotificationDate from "reminder_add/NotificationDate";
import NotificationWeekdays from "reminder_add/NotificationWeekdays";

const RepeatTypeContents = (props) => {
  switch (props.repeatType) {
    case '1':
      return (
        <NotificationDate />
      );
    case '2':
      break;
    case '3':
      return (
        <NotificationWeekdays />
      );
    default:
      break;
  }
  return (
    <React.Fragment>
    </React.Fragment>
  );
};

export default RepeatTypeContents
