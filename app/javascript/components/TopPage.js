import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { 
  CssBaseline, Grid, Hidden, Paper,
  Card, CardContent,
  Button,
} from '@material-ui/core';
import { Parallax } from 'react-parallax';

const useStyles = makeStyles((theme)=>({
  fullParallax: {
    height: '100vh',
    '& .react-parallax-bgimage': {
      height: '100vh !important',
      width: '100vw !important',
    }
  },
  fullParallaxChild: {
    margin: '0 auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstMessage: {
    marginTop: '150px',
    fontSize: '4.375vw', // 横幅375pxで16px
    fontFamily: "'Kosugi Maru', sans-serif",
  },
  whiteBorderShadow: {
    textShadow: `2px 2px 1px #fff,
                -2px 2px 1px #fff,
                2px -2px 1px #fff,
                -2px -2px 1px #fff,
                2px 0px 1px #fff,
                0px 2px 1px #fff,
                -2px 0px 1px #fff,
                0px -2px 1px #fff;
                `
  },
  startNowButton: {
    fontSize: '2vw',
    padding: '5px 50px',
    borderRadius: '50px',
  },
  centerHeight: {
    justifyContent: 'center',
  },
  otherMessage: {
    fontSize: '3vw',
    fontFamily: "'Roboto', sans-serif",
  },
  sideImage: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  cloudImage: {
    backgroundImage: 'url("/assets/top-bg-cloud.jpg")',
  },
  pcMobileImage: {
    backgroundImage: 'url("/assets/top-bg-pc-mobile.jpg")',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sameWidthCard: {
    width: '80%',
  }
}));

const TopPage = () => {
  const classes = useStyles();

  return (
    <>
      <Parallax blur={2} bgImage="/assets/top-bg-time.jpg" bgImageAlt="リマインダー"
        strength={window.innerHeight} className={classes.fullParallax}
      >
        <div className={classes.fullParallaxChild}>
          <p className={`${classes.firstMessage} ${classes.whiteBorderShadow}`}>
            クラウドでリマインダーを設定して<br />
            LINEやメールに通知を送ろう！
          </p>
          <p>
            <Button href="/users/sign_up" variant="contained" color="primary" className={classes.startNowButton}>今すぐはじめる</Button>
          </p>
        </div>
      </Parallax>

      <Parallax bgImageAlt="クラウド"
        strength={500} style={{height: '500px !important'}}
      >
        <Grid container component="main" style={{height: '500px'}}>
          <CssBaseline />
          <Grid item xs={12} sm={4} md={7} className={`${classes.sideImage} ${classes.cloudImage}`} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Card className={classes.sameWidthCard}>
                <CardContent>
                  クラウドだから面倒なアプリのインストールが不要！
                </CardContent>
              </Card>
              <div style={{height: '60px'}}></div>
              <Card className={classes.sameWidthCard}>
                <CardContent>
                  もうスマホを買い替えてもアプリを入れ直さなくてOK！
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Parallax>

      <Parallax bgImageAlt="クラウド"
        strength={500} style={{height: '500px !important'}}
      >
        <Grid container component="main" style={{height: '500px'}}>
          <CssBaseline />
          <Hidden smUp>
            <Grid item xs={12} sm={false} md={false} className={`${classes.sideImage} ${classes.pcMobileImage}`} />
          </Hidden>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Card className={classes.sameWidthCard}>
                <CardContent>
                  PCでもスマホでもタブレットでも共通で使える！
                </CardContent>
              </Card>
              <div style={{height: '60px'}}></div>
              <Card className={classes.sameWidthCard}>
                <CardContent>
                  一元管理して作業効率化！
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid item xs={false} sm={4} md={7} className={`${classes.sideImage} ${classes.pcMobileImage}`} />
        </Grid>
      </Parallax>
    </>
  );
};

export default TopPage
