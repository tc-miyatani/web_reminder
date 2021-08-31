import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  TextField, Backdrop, CircularProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import WarningIcon from '@material-ui/icons/Warning';
import TokenInput from "common/TokenInput";
import MessageDialog from "common/MessageDialog";
import ButtonToggleLoading from "common/ButtonToggleLoading";
import ConfirmDialog from "common/ConfirmDialog";
import axios from 'modules/axios_with_csrf';

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 132px)', // 132px: header 64px + footer (20+24*2)px
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    '&:first-child': {
      marginBottom: '40px',
    }
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: '20px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MyAccount = (props) => {
  console.log(props);
  const formUpdateRef = useRef();
  const formDeleteRef = useRef();

  const classes = useStyles();

  const nickname = props.flash?.nickname;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const confirmDialogRef = useRef();

  const handleUpdate = () => {
    const formData = new FormData(formUpdateRef.current);
    setIsLoading(true);
    axios.patch('/api/users/profile', formData)
      .then(res => {
        console.log(res.data);
        if (res.data?.is_success){
          setMsg(res.data?.msg);
        } else {
          const err_msg = res.data?.msg
                        + res.data?.error_messages?.join('!')
                        + '!';
          setMsg(err_msg);
        }
        setOpen(true);
      })
      .catch(error => {
        setMsg('通信エラーが発生しました。');
        setOpen(true);
        console.error(error);
      });
  };
  const handleDelete = async() => {
    const formData = new FormData(formDeleteRef.current);
    setIsLoading(true);
    const res = await confirmDialogRef.current.confirm();
    if (!res) {
      setIsLoading(false);
      return;
    }
    axios.delete('/api/users', formData)
      .then(res => {
        if (res.data?.is_success){
          setMsg(res.data?.msg);
          setIsDelete(true);
        } else {
          const err_msg = res.data?.msg
                        + res.data?.error_messages?.join('!')
                        + '!';
          setMsg(err_msg);
        }
        setOpen(true);
      })
      .catch(error => {
        setMsg('通信エラーが発生しました。');
        setOpen(true);
        console.error(error);
    });
  };
  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
    if (isDelete) { location.href = '/'; }
  };

  const account_type = () => {
    if (props.user_auth_model.email) {
      return (
        <>
          <span>アカウントタイプ： メールアカウント({ props.user_auth_model.email })</span>
        </>
      );
    } else {
      return (
        <>
          <span>アカウントタイプ： LINEアカウント</span>
        </>
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.wrap}>
        <Card className={classes.container}>
          <form ref={formUpdateRef}>
            <CardHeader title="アカウント情報"  align="center" />
            <CardContent>
              <input type="hidden" name="_method" value="patch" />
              { account_type() }
              <TokenInput />
              <TextField
                margin="normal"
                fullWidth
                id="nickname"
                label="ユーザー名"
                name="user[nickname]"
                autoFocus
                defaultValue={nickname}
              />
            </CardContent>
            <CardActions className={classes.actions}>
              <ButtonToggleLoading color="primary" isLoading={isLoading} onClick={handleUpdate}>
                更新
              </ButtonToggleLoading>
            </CardActions>
          </form>
        </Card>

        <Card className={classes.container}>
          <CardHeader title="アカウント削除"  align="center" />
          <form ref={formDeleteRef}>
            <CardContent>
              <Alert severity="error" icon={<WarningIcon fontSize="inherit" />} variant="filled">
                <AlertTitle>警告</AlertTitle>
                アカウントを削除すると<strong>元に戻せません！</strong>
              </Alert>
            </CardContent>
            <CardActions className={classes.actions}>
              <ButtonToggleLoading color="secondary" isLoading={isLoading} onClick={handleDelete}>
                削除
              </ButtonToggleLoading>
            </CardActions>
          </form>
        </Card>
      </Container>
      <MessageDialog open={open} onClose={handleClose} msg={msg} />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ConfirmDialog ref={confirmDialogRef}
        title="アカウント削除"
        message="本当にアカウントを削除しますか？"
        agree_text="削除する" agree_color="secondary"
        disagree="削除しない" disagree_color="primary"
      />
    </>
  );
};

export default MyAccount;
