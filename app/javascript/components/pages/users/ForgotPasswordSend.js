import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import SimpleLayout from "shares/SimpleLayout";

const useStyles = makeStyles((theme) => ({
  email: {
    color: theme.palette.primary.main
  },
}));

const ForgotPasswordSend = (props) => {
  const classes = useStyles();

  return (
    <SimpleLayout
      title="パスワード再設定メール送信完了"
      content={(
        <>
          <b className={classes.email}>{props.flash?.email}</b>にメールを送信しました。<br />
          メールに記載されているパスワードリセット用URLから新しいパスワードを設定してください。<br />
        </>
      )}
    />
  );
};

ForgotPasswordSend.propTypes = {
  flash: PropTypes.object,
};

export default ForgotPasswordSend;
