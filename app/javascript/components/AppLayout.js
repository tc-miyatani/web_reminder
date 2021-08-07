import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import { Button, Link } from "@material-ui/core";
import MyRouter from "./MyRouter";

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
              <Link href="/" color="inherit" className={classes.titleLink}>WebReminder</Link>
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
      <Container>
        <Box my={2}>
          <MyRouter {...props}/>
          {/* {[...Array(100)].map(i => <div key={i}><br /></div>)}TEST:スクロールテスト用 */}
          (c) master@web-reminder.jp
        </Box>
      </Container>
    </>
  );
}

AppLayout.propTypes = {
  is_sign_in: PropTypes.bool,
  content: PropTypes.string,
};

export default AppLayout
