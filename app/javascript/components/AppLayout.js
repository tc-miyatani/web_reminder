import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, Typography,
  Container, CssBaseline, useScrollTrigger, Slide,
  Button, Link,

} from "@material-ui/core";
import MyRouter from "./MyRouter";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://web-reminder.jp/">
        master@web-reminder.jp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    '&:hover': {
      textDecoration: 'none',
    }
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

const AppLayout = (props) => {
  const classes = useStyles();

  const trigger = useScrollTrigger({ target: window });

  return (
    <>
      <CssBaseline />
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.root}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link href="/" color="inherit" className={classes.titleLink}>CloudReminder</Link>
            </Typography>
            {(() => {
              if (props.is_sign_in) {
                return (
                  <>
                    <Button color="inherit" href="/reminders/new">リマインダー作成</Button>
                    <Button color="inherit" href="/users/sign_out" data-method="delete">ログアウト</Button>
                  </>
                );
              } else {
                return (
                  <>
                    <Button color="inherit" href="/users/sign_in">ログイン</Button>
                    <Button color="inherit" href="/users/sign_up">新規登録</Button> 
                  </>
                );
              }
            })()}
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
      <MyRouter {...props}/>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </>
  );
}

AppLayout.propTypes = {
  is_sign_in: PropTypes.bool,
  content: PropTypes.string,
};

export default AppLayout