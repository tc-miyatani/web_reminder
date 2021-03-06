import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import TokenInput from "common/TokenInput";
import rails_assets from "modules/rails_assets";
import SignForm from "shares/SignForm";
import { Typography, Link } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  rails_assets.setAssets(props);
  const classes = useStyles(props);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isError = !!props.validates_errors.full_messages;
  const errorMessage = props.validates_errors.full_messages?.join('。');
  const prevDataEmail = props.validates_errors.data?.email;

  return (
    <SignForm {...props}
      mailFromTitle="メールアドレスでログイン"
    >
      <form className={classes.form}
        action="/users/sign_in" method="post"
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
          error={isError}
          helperText={errorMessage}
          defaultValue={prevDataEmail}
        />
        <FormControl className={''} style={{width: '100%'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
          <OutlinedInput
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="パスワード"
            name="user_auth_mail[password]"
            autoComplete="current-password"
            autoFocus
            error={isError}
            helperText={errorMessage}

            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          ログイン
        </Button>
      </form>
      <Typography variant="body2" color="textPrimary" align='center'>
        アカウントをお持ちでない方は<Link color="primary" href="/users/sign_up">こちら</Link>
      </Typography>
      <Typography variant="body2" color="textPrimary" align='center'>
        パスワードをお忘れの方は<Link color="primary" href="/users/password/new">こちら</Link>
      </Typography>
    </SignForm>
  );
}

export default SignIn;
