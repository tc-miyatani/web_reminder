import React from "react"
import PropTypes from "prop-types"

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

const RepeatType = () => {
  const classes = useStyles();
  const [ruleType, setRuleType] = React.useState('');
  const handleChange = (event) => {
    setRuleType(event.target.value);
  };

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="repeat-type-label">リピートタイプ</InputLabel>
        <Select
          labelId="repeat-type-label"
          id="repeat-type"
          name="repeat-type"
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
    </React.Fragment>
  );
}

export default RepeatType
