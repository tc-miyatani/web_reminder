import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  hidden: {
    display: 'none',
  },
}));

const NotificationWeekdays = (props) => {
  const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

  const classes = useStyles();

  const getVariant = wday => props.reminder.weekdays?.includes(wday) ? 'contained' : 'outlined';

  const makeHandleChange = wday => () => {
    if (!props.reminder.weekdays) {
      props.onChange({weekdays: [wday]});
      return;
    }
    props.onChange({
      weekdays: props.reminder.weekdays.includes(wday) ?
                  props.reminder.weekdays.filter(w => w != wday) :      // ON  to OFF
                  props.reminder.weekdays.concat(wday).sort((a,b)=>a-b) // OFF to ON
    });
  };

  return (
    <>
      <div className={classes.title}>
        通知曜日
      </div>      
      <div className={classes.root}>
        <ButtonGroup aria-label="通知曜日" color="primary">
          {WEEKDAYS.map((wday_ja, wday) => (
            <Button key={wday} variant={getVariant(wday)} onClick={makeHandleChange(wday)}>{wday_ja}</Button>
          ))}
        </ButtonGroup>
      </div>

      <Select name="reminder[notification_weekdays_attributes][][weekday_id]"
              native multiple value={props.reminder.weekdays||[]} className={classes.hidden}
      >
        {WEEKDAYS.map((wday_ja, wday) => (
          <option key={wday} value={wday}>{wday_ja}</option>
        ))}
      </Select>
    </>
  );
};

NotificationWeekdays.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
};

export default NotificationWeekdays
