import React from "react"
import PropTypes from "prop-types"

import NotificationDate from "./NotificationDate";
import NotificationWeekdays from "./NotificationWeekdays";

const RepeatTypeContents = (props) => {
  switch (props.repeatType) {
    case 'once':
      return (
        <NotificationDate />
      );
    case 'repeat-daily':
      break;
    case 'repeat-weekly':
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
