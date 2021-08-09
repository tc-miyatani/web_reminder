import React from "react"
import PropTypes from "prop-types"

import ReminderList from 'ReminderList';
import ReminderAddWrap from 'ReminderAddWrap';
import TopPage from 'TopPage';

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const MyRouter = (props) => {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">{ props.is_sign_in ? <ReminderList /> : <TopPage {...props} /> }</Route>
        <Route exact path="/reminders/new" render={() => <ReminderAddWrap />} />
        <Route><div dangerouslySetInnerHTML={{__html: props.content}} /></Route>{/* Rails yield */}
      </Switch >
    </Router>
    </>
  );
};

MyRouter.propTypes = {
  content: PropTypes.string,
};

export default MyRouter
