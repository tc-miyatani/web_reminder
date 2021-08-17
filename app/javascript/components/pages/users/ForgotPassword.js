import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import SimpleLayout from "shares/SimpleLayout";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Link } from "@material-ui/core";
import TokenInput from "common/TokenInput";

const useStyles = makeStyles((theme) => ({
  form: {

  },
  submit: {

  },
}));

const ForgotPassword = (props) => {
  const classes = useStyles();

  const isEmailError = false;
  const emailErrorMessage = '';
  const prevDataEmail = '';

  return (
    <SimpleLayout
      title="パスワード再設定メールを送る"
      content={(
        <>
          <form className={classes.form}
            action="/users/password" method="post"
          >
            <TokenInput />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="user_auth_mail[email]"
              autoComplete="email"
              autoFocus
              error={isEmailError}
              helperText={emailErrorMessage}
              defaultValue={prevDataEmail}
            />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              送信
            </Button>
          </form>
        </>
      )}
    />
  );
}

export default ForgotPassword;
