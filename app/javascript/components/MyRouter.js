import React from "react"
import PropTypes from "prop-types"
import AppLayout from "shares/AppLayout";
import TopPage from 'pages/TopPage';
import ReminderList from 'pages/ReminderList';
import ReminderAddWrap from 'pages/ReminderAddWrap';
import SignUp from "pages/SignUp";
import SignIn from "pages/SignIn";
import RegisterMailSend from "pages/RegisterMailSend";

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const MyRouter = (props) => {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <AppLayout {...props}>
            { props.is_sign_in ? <ReminderList /> : <TopPage {...props} /> }
          </AppLayout>
        </Route>
        <Route exact path="/reminders/new">
          <AppLayout {...props}><ReminderAddWrap /></AppLayout>
        </Route>
        <Route exact path="/users/sign_up" render={() => <SignUp {...props} />} />
        <Route exact path="/users/sign_in" render={() => <SignIn {...props} />} />
        <Route exact path="/users/auth_mail_send">
        <AppLayout {...props}><RegisterMailSend {...props} /></AppLayout>
          </Route>
        <Route><div dangerouslySetInnerHTML={{__html: props.content}} /></Route>{/* Rails yield */}
      </Switch >
    </Router>
    </>
  );
};

MyRouter.propTypes = {
  content: PropTypes.string,
  is_sign_in: PropTypes.bool,
  rails_asset_path: PropTypes.object,
  flash_alerts: PropTypes.array,
  validates_errors: PropTypes.object,
};

export default MyRouter
