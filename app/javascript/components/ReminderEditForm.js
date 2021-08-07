import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  Divider, TextField, Button,

} from '@material-ui/core';
import RepeatType from 'reminder_add/RepeatType';
import NotificationTime from 'reminder_add/NotificationTime';
import ButtonToggleLoading from "common/ButtonToggleLoading";

import axios from 'modules/axios_with_csrf';
import MessageDialog from "common/MessageDialog";
import RepeatTypeContents from "reminder_add/RepeatTypeContents";

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  cardTitle: {
    display: 'inline-block'
  }
}));

const ReminderEditForm = (props) => {
  const classes = useStyles();

  const formEl = useRef(null);

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleUpdate = async () => {
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
    axios.patch(`/api/reminders/${props.reminder.id}`, formData)
      .then(res => {
        console.log(res.data);
        if (res.data?.is_success){
          setApiResponse({msg: res.data?.msg, is_success: res.data.is_success});
        } else {
          const err_msg = res.data?.msg
                        + res.data?.error_messages?.join('!')
                        + '!';
          setApiResponse({msg: err_msg, is_success: res.data.is_success});
        }
        setIsLoading(false);
        setOpen(true);
      })
      .catch(error => {
        setApiResponse({msg: '通信エラーが発生しました。', is_success: false});
        setIsLoading(false);
        setOpen(true);
      });
  };
  const handleDelete = () => {
    setApiResponse({msg: '未実装！'});
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = obj => props.onChange(props.reminder.id, obj);

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Card className={classes.container}>
          <CardHeader title={`リマインダーID: ${props.reminder.id}`} />
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
                <ButtonToggleLoading color="primary" isLoading={isLoading} onClick={handleUpdate}>
                  更新
                </ButtonToggleLoading>
                <ButtonToggleLoading color="secondary" isLoading={isLoading} onClick={handleDelete}>
                  削除
                </ButtonToggleLoading>
              </>
            }
          </CardActions>
        </Card>
      </Container>
      <MessageDialog open={open} onClose={handleClose} msg={apiResponse.msg} />
      <br /><br />
    </>
  );
};

ReminderEditForm.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
};

export default ReminderEditForm
