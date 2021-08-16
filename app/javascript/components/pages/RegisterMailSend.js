import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline, Container,
  Card, CardHeader, CardContent, CardActions,
  TextField
} from '@material-ui/core';
import { FullscreenExit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 132px)', // 132px: header 64px + footer (20+24*2)px
  },
  container: {
    width: '100%',
    maxWidth: '600px',
  },
  email: {
    color: theme.palette.primary.main
  },
}));

const RegisterMailSend = (props) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.wrap}>
        <Card className={classes.container}>
          <CardHeader title="仮登録完了" align="center" />
          <CardContent>
            <b className={classes.email}>{props.flash.email}</b>にメールを送信しました。<br />
            メールに記載されている認証用URLから本登録をお願いします。
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}

export default RegisterMailSend;
