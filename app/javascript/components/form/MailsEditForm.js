import React, { createRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,Table,TableBody,TableCell,TableContainer,TableRow,
  Card, CardHeader, CardContent, CardActions,
  TextField, Chip, Button
} from '@material-ui/core';

import DoneIcon from '@material-ui/icons/Done';
import MessageDialog from "common/MessageDialog";
import ButtonToggleLoading from "common/ButtonToggleLoading";


import axios from 'modules/axios_with_csrf';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '40px',
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: '20px',
  },
}));

const MailsEditForm = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDelete, setIsDelete] = useState(false);

  const handleSend = user_mail => () => {
    props.setIsLoading(true);
    const form_data = new FormData();
    form_data.set('id', user_mail.id);
    form_data.set('_method', 'patch');
    axios.post('/api/user_mail', form_data)
      .then(res => {
        setDialogMessage(`${user_mail.email}にメールを送信しました！メールに記載されている認証用URLから登録を完了してください！`);
        props.setIsLoading(false);
        setOpen(true);
      })
      .catch(error => {
        setDialogMessage('通信エラーが発生しました！');
        props.setIsLoading(false);
        setOpen(true);
      });
  };
  const handleDelete = user_mail => () => {
    props.setIsLoading(true);
    const form_data = new FormData();
    form_data.set('id', user_mail.id);
    form_data.set('_method', 'delete');
    axios.post('/api/user_mail', form_data)
      .then(res => {
        setDialogMessage(`${user_mail.email}を削除しました`);
        props.setIsLoading(false);
        setOpen(true);
        setIsDelete(true);
      })
      .catch(error => {
        setDialogMessage('通信エラーが発生しました！');
        props.setIsLoading(false);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
    if (isDelete) { location.reload(); }
  };

  return (
    <>
      <Card className={classes.container}>
        <CardHeader title="通知先の管理"  align="center" />
        <CardContent>
        <TableContainer>
          <Table
            // className={classes.table}
            size="medium"
          >
            <TableBody>
            {+props.user.auth_type == 2 && (
              <TableRow hover>
                <TableCell align="center">
                  LINE
                </TableCell>
                <TableCell align="right">
                <Chip label="認証済み" color="primary" variant="outlined" size="small" onDelete={()=>{}} deleteIcon={<DoneIcon />} />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" variant="contained" disabled>削除不可</Button>
                </TableCell>
              </TableRow>
            )}
            {props.user.user_mails.map(user_mail => (
              <TableRow key={user_mail.id} hover>
                <TableCell align="center">
                  {user_mail.email}
                </TableCell>
                <TableCell align="right">
                  {!!user_mail.confirmed_at ?
                    (
                      <Chip label="認証済み" color="primary" variant="outlined" size="small" onDelete={()=>{}} deleteIcon={<DoneIcon />} />
                    )
                    :
                    (
                      <ButtonToggleLoading color="primary" isLoading={props.isLoading} onClick={handleSend(user_mail)}>
                        再送
                      </ButtonToggleLoading>
                    )
                  }
                </TableCell>
                <TableCell align="right">
                  {+props.user.auth_type == 1 && user_mail.email == props.user.user_auth_mail.email ?
                    (
                      <Button size="small" variant="contained" disabled>削除不可</Button>
                    )
                    :
                    (
                      <ButtonToggleLoading color="secondary" isLoading={props.isLoading} onClick={handleDelete(user_mail)}>
                        削除
                      </ButtonToggleLoading>
                    )
                  }
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        </CardContent>
      </Card>
      <MessageDialog open={open} onClose={handleClose} msg={dialogMessage} />
    </>
  );
}

export default MailsEditForm;

