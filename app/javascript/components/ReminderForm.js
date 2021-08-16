import React, { forwardRef, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  TextField, Backdrop, CircularProgress
} from '@material-ui/core';
import RepeatType from 'reminder_add/RepeatType';
import RepeatTypeContents from "reminder_add/RepeatTypeContents";
import NotificationTime from 'reminder_add/NotificationTime';

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 152px)', // 132px: header 64px + footer (20+24*2)px
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ReminderForm = forwardRef((props, ref) => {
  const classes = useStyles();

  const handleChange = obj => props.onChange(obj);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={props.single ? classes.wrap : ''}>
        <Card className={classes.container}>
          <CardHeader title={props.title} />
          <CardContent>
            <form ref={ref} noValidate autoComplete="off">
              <RepeatType reminder={props.reminder} onChange={handleChange} /><br />
              { props.reminder.repeat_type_id &&
                <>
                  <RepeatTypeContents reminder={props.reminder} onChange={handleChange} />
                  <NotificationTime reminder={props.reminder} onChange={handleChange} />
                  <TextField  name="reminder[message]" label="通知メッセージ" required fullWidth
                              defaultValue={props.reminder.message} />
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
      </Container>
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
