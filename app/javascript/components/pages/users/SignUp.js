import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import TokenInput from "common/TokenInput";
import rails_assets from "modules/rails_assets";
import SignForm from "shares/SignForm";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  rails_assets.setAssets(props);
  const classes = useStyles(props);

  const isEmailError = !!props.validates_errors.full_messages;
  const emailErrorMessage = props.validates_errors.full_messages?.join('。');
  const prevDataEmail = props.validates_errors.data?.email;

  return (
    <SignForm {...props}
      mailFromTitle="メールアドレスで登録"
    >
      <form className={classes.form}
        action="/users" method="post"
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          新規登録
        </Button>
      </form>
      <Typography variant="body2" color="textPrimary" align='center'>
        アカウントをお持ちの方は<Link color="primary" href="/users/sign_in">こちら</Link>
      </Typography>
    </SignForm>
  );
}

SignUp.propTypes = {
  rails_asset_path: PropTypes.object,
  validates_errors: PropTypes.object,
};

export default SignUp;
