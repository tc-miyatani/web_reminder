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
}));

const ResetPassword = (props) => {
  const classes = useStyles();

  if (props.flash.error) {
    return (
      <SimpleLayout
        title="パスワード再設定"
        content={(
          <>{props.flash.error}</>
        )}
      />
    )
  }

  const isError = !!props.flash.validate_error_messages;
  const errorMessage = props.flash.validate_error_messages?.join('。');

  return (
    <form className={classes.form} action="/users/password" method="post">
      <input type="hidden" name="_method" value="patch" />
      <SimpleLayout
        title="パスワード再設定"
        content={(
          <>
            <TokenInput />
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
          <Button type="submit" variant="contained" color="primary">
            再設定
          </Button>
        )}
      />
    </form>
  );
}

ResetPassword.propTypes = {
  flash: PropTypes.object,
};

export default ResetPassword;
