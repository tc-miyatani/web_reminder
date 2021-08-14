import React, { createRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OutTitleCard from "common/OutTitleCard";
import TokenInput from "common/TokenInput";
import rails_assets from "modules/rails_assets";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://web-reminder.jp/">
        master@web-reminder.jp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: rails_assets.bg('sign-up-bg.jpg'),
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: '20px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  line: {
    margin: theme.spacing(3, 0, 2),
    color: '#FFFFFF',
    backgroundColor: '#00C300',
    '&:hover': { backgroundColor: '#00E000' },
    '&active': { backgroundColor: '#00B300' }
  },
  lineIcon: {
    position: 'absolute',
    left: '10px',
    top: '20%',
    height: '23px',
  },
  titleLogo: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0',
  },
}));

const SignUp = (props) => {
  rails_assets.setAssets(props);
  const classes = useStyles(props);

  const isEmailError = !!props.validates_errors.full_messages;
  const emailErrorMessage = props.validates_errors.full_messages?.join('。');
  const prevDataEmail = props.validates_errors.data?.email;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.titleLogo}>
          <img src={rails_assets('title-logo.png')} alt="CloudReminder" />
        </div>
        <OutTitleCard title="LINEアカウントで新規登録">
        <div className={classes.paper}>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={
                  <img className={classes.lineIcon}
                    src={rails_assets('line-login-icon.png')}
                  />}
                className={classes.line}
                href="/users/auth/line"
                data-method="post"
              >
                LINEでログイン
          </Button>
          </div>
        </OutTitleCard>
        <OutTitleCard title="メールアドレスで登録">
        <div className={classes.paper}>
          
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
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
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        </OutTitleCard>
      </Grid>
    </Grid>
  );
}

SignUp.propTypes = {
  rails_asset_path: PropTypes.object,
  validates_errors: PropTypes.object,
};

export default SignUp;
