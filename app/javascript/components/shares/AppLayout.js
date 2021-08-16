import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, Typography,
  Container, CssBaseline, useScrollTrigger, Slide,
  Button, Link,

} from "@material-ui/core";
import ClosableAlert from "common/ClosableAlert";
import Copyright from "shares/Copyright";

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
  flash_alerts: {
    position: 'absolute',
    top: '64px',
    zIndex: '9999',
  }
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
      {props.flash_alerts.length > 0 &&
        <Container className={classes.flash_alerts}>
          {props.flash_alerts.map(([severity, message], i) => (
            <ClosableAlert key={i} severity={severity} message={message} />
          ))}
        </Container>
      }
      { props.children }
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
