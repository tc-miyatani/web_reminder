import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,TableBody,TableCell,TableContainer,TableRow,
  Chip, Button, Checkbox,
} from '@material-ui/core';

import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { map } from "jquery";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    marginTop: '15px',
    width: '100%',
    // maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  hidden: {
    display: 'none',
  },
}));

const NotificationTargets = (props) => {
  const classes = useStyles();
  console.log(props);

  const [checkedItems, setCheckedItems] = useState([]);
  const [targetMails, setTargetMails] = useState([]);
  const [targetProviders, setTargetProvides] = useState([]);

  const itemList = props.user.user_providers.map(user_provider=>{
                      return user_provider.provider_name.toUpperCase()
                    })
                    .concat(
                      props.user.user_mails
                        .filter(user_mail=>user_mail.confirmed_at)
                        .map(user_mail=>user_mail.email)
                    );

  const setHiddenSelect = (items) => {
    const mail_ids = props.user.user_mails.filter(user_mail=>items.includes(user_mail.email))
                                          .map(user_mail=>user_mail.id);
    const provider_ids = props.user.user_providers.filter(provider=>items.includes(provider.provider_name.toUpperCase()))
                                                  .map(provider=>provider.id)
    // console.log(mail_ids, provider_ids);
    setTargetMails(mail_ids);
    setTargetProvides(provider_ids);
    // const f = new FormData(document.querySelector('form'));
    // console.log(f.get('reminder_form[target_mails]'));
    // console.log(f.get('reminder_form[target_mails][]'));
  };

  const handleChange = (event) => {
    setCheckedItems(event.target.value);
    setHiddenSelect(event.target.value);
  };

  useEffect(() => {
    if (props.reminder?.id) {
      const targets = props.reminder.user_providers.map(user_provider=>{
                        return user_provider.provider_name.toUpperCase()
                      })
                      .concat(
                        props.reminder.user_mails
                          .filter(user_mail=>user_mail.confirmed_at)
                          .map(user_mail=>user_mail.email)
                      );
      setCheckedItems(targets);
      setHiddenSelect(targets);
    } else {
      setCheckedItems(itemList);
      setHiddenSelect(itemList);
    }
  }, []);

  return (

    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">通知先</InputLabel>
        <Select
          color="primary"
          multiple
          value={checkedItems}
          onChange={handleChange}
          // input={<Input />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(item => {
                return (
                  <Chip key={item} label={item} className={classes.chip} />
                );
              })}
            </div>
          )}
          // MenuProps={MenuProps}
        >
          {itemList.map(item => {
            return (
              <MenuItem key={item} value={item}>
                <Checkbox checked={checkedItems.includes(item)} />
                <ListItemText primary={item} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Select native multiple name="reminder_form[target_mails][]" value={targetMails}
        className={classes.hidden}
      >
        {targetMails.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </Select>
      <Select native multiple name="reminder_form[target_providers][]" value={targetProviders} 
        className={classes.hidden}
      >
        {targetProviders.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </Select>

    {/* <TableContainer>
      <Table size="medium">
        <TableBody>
        {props.user.user_providers.map(user_provider => (
          <TableRow key={user_provider.id} hover>
            <TableCell align="center">
              <Checkbox name="reminder_form[reminder_provider][]" defaultChecked={true}
                color="primary"
              />
            </TableCell>
            <TableCell align="center">
              LINE
            </TableCell>
          </TableRow>
        ))}
        {props.user.user_mails.map(user_mail => (
          <TableRow key={user_mail.id} hover>
            <TableCell align="center">
            <Checkbox name="reminder_form[reminder_mail][]" defaultChecked={true}
                color="primary"
              />
            </TableCell>
            <TableCell align="center">
              {user_mail.email}
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>       */}
    </>

  );
}

export default NotificationTargets;
