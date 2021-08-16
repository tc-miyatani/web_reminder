import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import SimpleLayout from "shares/SimpleLayout";

const useStyles = makeStyles((theme) => ({
  email: {
    color: theme.palette.primary.main
  },
}));

const RegisterMailSend = (props) => {
  const classes = useStyles();

  return (
    <SimpleLayout
      title="仮登録完了"
      content={(
        <>
          <b className={classes.email}>{props.flash.email}</b>にメールを送信しました。<br />
          メールに記載されている認証用URLから本登録をお願いします。
        </>
      )}
    />
  );
}

export default RegisterMailSend;
