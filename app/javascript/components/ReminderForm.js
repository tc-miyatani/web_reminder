import React, { forwardRef, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  TextField
} from '@material-ui/core';
import RepeatType from 'reminder_add/RepeatType';
import RepeatTypeContents from "reminder_add/RepeatTypeContents";
import NotificationTime from 'reminder_add/NotificationTime';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  cardTitle: {
    display: 'inline-block'
  }
}));

const ReminderForm = forwardRef((props, ref) => {
  const classes = useStyles();

  const handleChange = obj => props.onChange(obj);

  return (
    <>
      <CssBaseline />
      <Container fixed>
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
    </>
  );
});

ReminderForm.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
  title    : PropTypes.string,
};

export default ReminderForm
