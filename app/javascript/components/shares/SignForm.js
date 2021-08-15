import React from "react";
import PropTypes from "prop-types";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import OutTitleCard from "common/OutTitleCard";
import rails_assets from "modules/rails_assets";
import Copyright from "shares/Copyright";

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

const SignForm = (props) => {
  rails_assets.setAssets(props);
  const classes = useStyles(props);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.titleLogo}>
          <a href="/">
            <img src={rails_assets('title-logo.png')} alt="CloudReminder" />
          </a>
        </div>
        <OutTitleCard title="LINEアカウントで登録/ログイン">
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
        <OutTitleCard title={props.mailFromTitle}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {props.children}
        </div>
        </OutTitleCard>
        <Box mt={5}>
          <Copyright align="center" />
        </Box>
      </Grid>
    </Grid>
  );
}

SignForm.propTypes = {
  rails_asset_path: PropTypes.object,
  validates_errors: PropTypes.object,
};

export default SignForm;
