import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { 
  CssBaseline, Grid, Hidden, Paper,
  Card, CardContent,
  Button,
} from '@material-ui/core';
import { Parallax } from 'react-parallax';
import InViewMonitor from 'react-inview-monitor';
import 'animate.css/animate.min.css';

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
    backgroundImage: props => `url("${props.rails_asset_path['top-bg-cloud.jpg']}")`,
  },
  pcMobileImage: {
    backgroundImage: props => `url("${props.rails_asset_path['top-bg-pc-mobile.jpg']}")`,
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

const TopPage = (props) => {
  const classes = useStyles(props);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      [...document.querySelectorAll('.scroll_animate')].map(elm => {
        const scroll = window.scrollY;
        const offsetTop = elm.offsetTop;
        const windowHeight = window.innerHeight;
        if (offsetTop < scroll + windowHeight) {
          elm.dataset.animate.split(' ').map(className => elm.classList.add(className));
        } else {
          elm.dataset.animate.split(' ').map(className => elm.classList.remove(className));
        }
      });
    });
  }, []);

  return (
    <>
      <Parallax blur={2} bgImage={props.rails_asset_path['top-bg-time.jpg']} bgImageAlt="リマインダー"
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

      <Grid container component="main" style={{height: '500px'}}
        className={'scroll_animate'} data-animate="animate__animated animate__fadeInLeft"
      >
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

      <Grid container component="main" style={{height: '500px'}}
        className={'scroll_animate'} data-animate="animate__animated animate__fadeInUp"
      >
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
    </>
  );
};

export default TopPage
