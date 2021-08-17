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
    width: '100%',
  },
  submit: {

  },
}));

const ForgotPassword = (props) => {
  const classes = useStyles();

  const isEmailError = !!props.flash?.error;
  const emailErrorMessage = props.flash?.error;
  const prevDataEmail = props.flash?.email;

  return (
    <form className={classes.form} action="/users/password" method="post">
      <SimpleLayout
        title="パスワード再設定メールを送る"
        content={(
          <>
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
          </>
        )}
        action={(
          <Button type="submit" variant="contained" color="primary">
            送信
          </Button>
        )}
      />
    </form>
  );
}

ForgotPassword.propTypes = {
  flash: PropTypes.object,
};

export default ForgotPassword;
