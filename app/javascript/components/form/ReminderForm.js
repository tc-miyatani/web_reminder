import React, { forwardRef} from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  Backdrop, CircularProgress, TextField,
} from '@material-ui/core';
import RepeatType from 'reminder_add/RepeatType';
import RepeatTypeContents from "reminder_add/RepeatTypeContents";
import NotificationTime from 'reminder_add/NotificationTime';
import NotificationTargets from "reminder_add/NotificationTargets";

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
  message: {
    marginTop: '20px',
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
                  <TextField multiline id="reminder[message]" defaultValue={props.reminder.message}
                    fullWidth variant="outlined"
                    label="通知メッセージ" className={classes.message}
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
