import React from "react"
import PropTypes from "prop-types"
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ReminderAddForm = () => {
  const classes = useStyles();
  const [ruleType, setRuleType] = React.useState('');
  const handleChange = (event) => {
    setRuleType(event.target.value);
  };

  return (
    <React.Fragment>
      <h2>リマインダー作成フォーム</h2>
      <form noValidate autoComplete="off">

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">リピートタイプ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ruleType}
            onChange={handleChange}
          >
            <MenuItem value='once'>1回きり</MenuItem>
            <MenuItem value='repeat-daily'>繰り返し(毎日)</MenuItem>
            <MenuItem value='repeat-weekly'>繰り返し(毎週○曜日)</MenuItem>
            <MenuItem value='repeat-monthly'>繰り返し(毎月○日)</MenuItem>
            <MenuItem value='repeat-every-days'>繰り返し(○日毎)</MenuItem>
            <MenuItem value='repeat-every-weekly-days'>繰り返し(指定曜日○日毎)</MenuItem>
          </Select>
        </FormControl>
        <br/><br/><br/>

        <TextField name="message" label="通知メッセージ" required />
      </form>
    </React.Fragment>
  );
};

export default ReminderAddForm
