import React, { forwardRef} from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  Backdrop, CircularProgress
} from '@material-ui/core';
import RepeatType from 'reminder_add/RepeatType';
import RepeatTypeContents from "reminder_add/RepeatTypeContents";
import NotificationTime from 'reminder_add/NotificationTime';
import MyTextField from "common/MyTextField";

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  messageTitle: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.54)',
    margin: '10px 0',
  },
  message: {
    padding: '10px',
    width: '100%',
    minHeight: '50px',
  },
}));

const ReminderForm = forwardRef((props, ref) => {
  const classes = useStyles();

  const handleChange = obj => props.onChange(obj);

  return (
    <>
        <Card className={classes.container}>
          <CardHeader title={props.title} />
          <CardContent>
            <form ref={ref} noValidate autoComplete="off">
              <RepeatType reminder={props.reminder} onChange={handleChange} /><br />
              { props.reminder.repeat_type_id &&
                <>
                  <RepeatTypeContents reminder={props.reminder} onChange={handleChange} />
                  <NotificationTime reminder={props.reminder} onChange={handleChange} />
                  <MyTextField name="reminder[message]" defaultValue={props.reminder.message}
                    aria-label="通知メッセージ" placeholder="通知メッセージ" required
                  />
                </>
              }
            </form>
          </CardContent>
          <CardActions>
            { props.reminder.repeat_type_id &&
              <>
                {props.children}
              </>
            }
          </CardActions>
        </Card>
      <Backdrop className={classes.backdrop} open={props.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
});

ReminderForm.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
  title    : PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ReminderForm
