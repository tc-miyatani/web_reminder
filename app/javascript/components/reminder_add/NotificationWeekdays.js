import React from "react"
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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

const NotificationWeekdays = () => {
  const classes = useStyles();
  const hiddenSelect = React.useRef(null);

  const weekdays = [];
  const setWeekdays = [];
  const handlesWeekdaysChange = [];
  for (let i = 0; i < 7; i++) {
    [weekdays[i], setWeekdays[i]] = React.useState(false);
    handlesWeekdaysChange[i] = () => {
      const after = !weekdays[i];
      setWeekdays[i](after);
      hiddenSelect.current.options[i].selected = after;
    };
  }

  const getVariant = (is_selected) => is_selected ? 'contained' : 'outlined';

  return (
    <React.Fragment>
      <div className={classes.title}>
        通知曜日
      </div>      
      <div className={classes.root}>
        <ButtonGroup aria-label="通知曜日" color="primary">
          <Button variant={getVariant(weekdays[0])} onClick={handlesWeekdaysChange[0]}>日</Button>
          <Button variant={getVariant(weekdays[1])} onClick={handlesWeekdaysChange[1]}>月</Button>
          <Button variant={getVariant(weekdays[2])} onClick={handlesWeekdaysChange[2]}>火</Button>
          <Button variant={getVariant(weekdays[3])} onClick={handlesWeekdaysChange[3]}>水</Button>
          <Button variant={getVariant(weekdays[4])} onClick={handlesWeekdaysChange[4]}>木</Button>
          <Button variant={getVariant(weekdays[5])} onClick={handlesWeekdaysChange[5]}>金</Button>
          <Button variant={getVariant(weekdays[6])} onClick={handlesWeekdaysChange[6]}>土</Button>
        </ButtonGroup>
      </div>
      <select name="reminder[notification_weekdays_attributes][][weekday_id]" multiple className={classes.hidden} ref={hiddenSelect}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </React.Fragment>
  );
};

export default NotificationWeekdays
