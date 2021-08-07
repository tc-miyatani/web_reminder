import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RepeatType = (props) => {
  const MENUS = { 1: '1回きり', 2: '繰り返し(毎日)', 3: '繰り返し(毎週○曜日)' };
  // TODO: '繰り返し(毎月○日)', '繰り返し(○日毎)', '繰り返し(指定曜日○日毎)'
  // 'repeat-monthly', 'repeat-every-days', 'repeat-every-weekly-days'

  const classes = useStyles();

  const handleChange = event => props.onChange({repeat_type_id: +event.target.value});

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="repeat-type-label">リピートタイプ</InputLabel>
        <Select
          labelId="repeat-type-label"
          id="repeat-type"
          name="reminder[repeat_type_id]"
          value={String(props.reminder.repeat_type_id || '')}
          onChange={handleChange}
        >
          {Object.entries(MENUS).map(([val, text]) => (
            <MenuItem key={val} value={val}>{text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

RepeatType.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
};

export default RepeatType
