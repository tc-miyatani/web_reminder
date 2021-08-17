import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import SimpleLayout from "shares/SimpleLayout";
import TokenInput from "common/TokenInput";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Link } from "@material-ui/core";

const ConfirmPage = (props) => {
  if (props.flash.error_message) {
    return (
      <SimpleLayout
        title="エラー"
        content={(
          <Typography variant="body1">
            <p>{props.flash.error_message}</p>
            <Link color="primary" href="/users/sign_in">ログイン</Link>
            {' '}
            <Link color="primary" href="/users/sign_up">新規登録</Link>
          </Typography>
        )}
      />
    );
  }

  const isError = !!props.flash.validate_errors;
  const errorMessage = props.flash.validate_errors?.full_messages.join('。');
  const prevDataNickname = props.flash?.nickname;

  return (
    <form action="/users/confirmation" method="post">
      <SimpleLayout
        title="本登録フォーム"
        content={(
          <>
            <input type="hidden" name="_method" value="patch" />
            <TokenInput />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="nickname"
              label="ユーザー名"
              name="user_auth_mail[nickname]"
              autoFocus
              defaultValue={prevDataNickname}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="パスワード"
              type="password"
              name="user_auth_mail[password]"
              autoComplete="current-password"
              autoFocus
              error={isError}
              helperText={errorMessage}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password_confirmation"
              label="パスワード"
              type="password"
              name="user_auth_mail[password_confirmation]"
              autoFocus
              error={isError}
            />

          </>
        )}
        action={(
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              登録
            </Button>
          </>
        )}
      />
    </form>
  );
};

export default ConfirmPage;
