import React, { createRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, CardActions,
  TextField
} from '@material-ui/core';
import MessageDialog from "common/MessageDialog";
import ButtonToggleLoading from "common/ButtonToggleLoading";

import axios from 'modules/axios_with_csrf';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '40px',
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: '20px',
  },
}));

const MailAddForm = (props) => {
  const classes = useStyles();

  const formRef = createRef();
  const [emailValue, setEmailValue] = useState('');
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');


  const handleAdd = () => {
    props.setIsLoading(true);

    const formData = new FormData(formRef.current);
    console.log(formData);

    axios.post('/api/user_mail', formData)
      .then(res => {
        console.log(res.data);
        if (res.data?.is_success){
          setDialogMessage('メールアドレスにメールを送信しました！メールに記載されている認証用URLから登録を完了してください！');
          setEmailValue('');
        } else {
          const err_msg = res.data?.errors.join('!') + '!';
                        setDialogMessage(err_msg);
        }
        props.setIsLoading(false);
        setOpen(true);
      })
      .catch(error => {
        console.error(error);
        setDialogMessage('通信エラーが発生しました！');
        props.setIsLoading(false);
        setOpen(true);
      });

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        <Card className={classes.container}>
          <form ref={formRef}>
            <CardHeader title="通知先の追加"  align="center" />
            <CardContent>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="add-email"
                label="メールアドレス"
                name="user_mail[email]"
                autoComplete="email"
                error={isEmailError}
                helperText={emailErrorMessage}
                value={emailValue}
                onChange={handleEmailChange}
              />
            </CardContent>
            <CardActions className={classes.actions}>
              <ButtonToggleLoading color="primary" isLoading={props.isLoading} onClick={handleAdd}>
                追加
              </ButtonToggleLoading>
            </CardActions>
          </form>
        </Card>
        <MessageDialog open={open} onClose={handleClose} msg={dialogMessage} />
    </>
  );
}

MailAddForm.propTypes = {
  isLoading : PropTypes.bool,
  setIsLoading : PropTypes.func,
};

export default MailAddForm;
