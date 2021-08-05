import React from "react"
import PropTypes from "prop-types"

import NotificationDate from "./NotificationDate";
import NotificationWeekdays from "./NotificationWeekdays";

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
