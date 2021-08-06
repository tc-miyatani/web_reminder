import React from "react";
import PropTypes from "prop-types";
import NotificationDate from "reminder_add/NotificationDate";
import NotificationWeekdays from "reminder_add/NotificationWeekdays";

const RepeatTypeContents = (props) => {
  const handleChange = obj => props.onChange(obj);

  switch (+props.reminder.repeat_type_id) {
    case 1:
      return <NotificationDate reminder={props.reminder} onChange={handleChange} />;
    case 2:
      break;
    case 3:
      return <NotificationWeekdays reminder={props.reminder} onChange={handleChange} />;
    default:
      break;
  }
  return <></>;
};

RepeatTypeContents.propTypes = {
  reminder: PropTypes.object,
  onChange: PropTypes.func,
};

export default RepeatTypeContents
