import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  Divider, TextField, Button,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@material-ui/core';
import RepeatType from './reminder_add/RepeatType';
import NotificationTime from './reminder_add/NotificationTime';
import ButtonToggleLoading from "./common/ButtonToggleLoading";

import axios from './modules/axios_with_csrf';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  cardTitle: {
    display: 'inline-block'
  }
}));

const ReminderAddForm = () => {
  const classes = useStyles();

  const [addResponse, setAddResponse] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    const formEl = document.getElementById('reminder-add-from');
    const formData = new FormData(formEl);
    console.log(formData);
    setIsLoading(true);
    axios.post('/api/reminders', formData)
      .then(res => {
        if (res.data?.is_success){
          setAddResponse({msg: res.data?.msg, is_success: res.data.is_success});
        } else {
          const err_msg = res.data?.msg
                        + res.data?.error_messages?.join('!')
                        + '!';
          setAddResponse({msg: err_msg, is_success: res.data.is_success});
        }
        setIsLoading(false);
        setOpen(true);
      })
      .catch(error => {
        setAddResponse({msg: '通信エラーが発生しました。', is_success: false});
        setIsLoading(false);
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
    if (addResponse?.is_success) {
      location.href = '/';
    }
  };

  const [repeatType, setRepeatType] = React.useState('');
  const handleRepeatTypeChange = (repeatTypeValue) => {
    setRepeatType(repeatTypeValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Card className={classes.container}>
          <CardHeader title="リマインダー作成フォーム" />
          <CardContent>
            <form id="reminder-add-from" noValidate autoComplete="off">
              <RepeatType onChange={handleRepeatTypeChange} /><br />
              { repeatType !== '' &&
                <React.Fragment>
                  <NotificationTime />
                  <TextField name="message" label="通知メッセージ" required fullWidth />
                </React.Fragment>
              }
            </form>
          </CardContent>
          <CardActions>
            { repeatType !== '' &&
              <ButtonToggleLoading isLoading={isLoading} onClick={handleOpen}>
                登録
              </ButtonToggleLoading>
            }
          </CardActions>
        </Card>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"WebReminder"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {addResponse.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ReminderAddForm
