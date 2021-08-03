import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  Divider, TextField, Button,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@material-ui/core';
import RepeatType from './reminder_add/RepeatType';
import NotificationTime from './reminder_add/NotificationTime';
import axios from 'axios';
import ButtonToggleLoading from "./common/ButtonToggleLoading";

const useStyles = makeStyles((theme) => ({
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
  const theme = useTheme();

  const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

  const [addResponse, setAddResponse] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    const formEl = document.getElementById('reminder-add-from');
    const formData = new FormData(formEl);
    console.log(formData);
    setIsLoading(true);
    // const res = await axios.post('/reminders/', {body: formData });
    // console.log(res);
    // console.log(res.data);
    setAddResponse({msg: '登録に成功しました！'});
    await sleep(1000);
    setIsLoading(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
