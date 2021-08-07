import React , { useRef, useState } from "react"
import PropTypes from "prop-types"

import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  Divider, TextField, Button,
} from '@material-ui/core';
import MessageDialog from "common/MessageDialog";
import ButtonToggleLoading from "common/ButtonToggleLoading";
import RepeatType from 'reminder_add/RepeatType';
import RepeatTypeContents from "reminder_add/RepeatTypeContents";
import NotificationTime from 'reminder_add/NotificationTime';

import axios from 'modules/axios_with_csrf';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  cardTitle: {
    display: 'inline-block'
  }
}));

const ReminderAddForm = (props) => {
  const classes = useStyles();

  const formEl = useRef(null);

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const formData = new FormData(formEl.current);
    console.log(formData);

    if (
      formData.get('reminder[repeat_type_id]') === '3' &&
      formData.getAll('reminder[notification_weekdays_attributes][][weekday_id]').length === 0
    ) {
      setApiResponse({msg: '曜日を選択してください！', is_success: false});
      setOpen(true);
      return;
    }

    setIsLoading(true);
    axios.post('/api/reminders', formData)
      .then(res => {
        console.log(res.data);
        if (res.data?.is_success){
          setApisResponse({msg: res.data?.msg, is_success: res.data.is_success});
        } else {
          const err_msg = res.data?.msg
                        + res.data?.error_messages?.join('!')
                        + '!';
          setApisResponse({msg: err_msg, is_success: res.data.is_success});
        }
        setIsLoading(false);
        setOpen(true);
      })
      .catch(error => {
        setApisResponse({msg: '通信エラーが発生しました。', is_success: false});
        setIsLoading(false);
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
    if (apiResponse?.is_success) {
      location.href = '/';
    }
  };

  const handleChange = obj => props.onChange(obj);

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Card className={classes.container}>
          <CardHeader title="リマインダー作成フォーム" />
          <CardContent>
            <form ref={formEl} noValidate autoComplete="off">
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
                <ButtonToggleLoading isLoading={isLoading} onClick={handleOpen}>
                  登録
                </ButtonToggleLoading>
              </>
            }
          </CardActions>
        </Card>
      </Container>
      <MessageDialog open={open} onClose={handleClose} msg={apiResponse.msg} />
    </>
  );
}

ReminderAddForm.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
};

export default ReminderAddForm
