import React, { createRef, useState } from "react";
import PropTypes from "prop-types";

import ReminderForm from "ReminderForm";
import MessageDialog from "common/MessageDialog";
import ButtonToggleLoading from "common/ButtonToggleLoading";

import axios from 'modules/axios_with_csrf';

const ReminderEditForm = (props) => {
  const formRef = createRef();

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleUpdate = () => {
    const formData = new FormData(formRef.current);
    console.log(formData);

    if (
      formData.get('reminder[repeat_type_id]') === '3' &&
      formData.getAll('reminder[notification_weekdays_attributes][][weekday_id]').length === 0
    ) {
      setApiResponse({msg: '曜日を選択してください！', is_success: false});
      setOpen(true);
      return;
    }

    setIsLoading(true);
    axios.patch(`/api/reminders/${props.reminder.id}`, formData)
      .then(res => {
        console.log(res.data);
        if (res.data?.is_success){
          setApiResponse({msg: res.data?.msg, is_success: true});
        } else {
          const err_msg = res.data?.msg
                        + res.data?.error_messages?.join('!')
                        + '!';
          setApiResponse({msg: err_msg, is_success: res.data.is_success});
        }
        setOpen(true);
      })
      .catch(error => {
        setApiResponse({msg: '通信エラーが発生しました。', is_success: false});
        setOpen(true);
      });
  };
  const handleDelete = () => {
    setIsLoading(true);
    axios.delete(`/api/reminders/${props.reminder.id}`)
      .then(res => {
        setIsDelete(true);
        setApiResponse({msg: res.data?.msg, is_success: true});
        setOpen(true);
      })
      .catch(error => {
        const err_msg = res.data?.msg
                      + res.data?.error_messages?.join('!')
                      + '!';
        setApiResponse({msg: err_msg, is_success: res.data.is_success});
        setOpen(true);
      });
  };
  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
    if (isDelete) {
      setIsDelete(false);
      props.onDelete(props.reminder.id);
    }
  };

  const handleChange = obj => props.onChange(props.reminder.id, obj);

  return (
    <>
      <ReminderForm ref={formRef} onChange={handleChange} isLoading={isLoading}
        title={`リマインダーID: ${props.reminder.id}`}
        reminder={props.reminder}
      >
        <ButtonToggleLoading color="primary" isLoading={isLoading} onClick={handleUpdate}>
          更新
        </ButtonToggleLoading>
        <ButtonToggleLoading color="secondary" isLoading={isLoading} onClick={handleDelete}>
          削除
        </ButtonToggleLoading>
      </ReminderForm>
      <MessageDialog open={open} onClose={handleClose} msg={apiResponse.msg} />
    </>
  );
};

ReminderEditForm.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
  onDelete : PropTypes.func,
};

export default ReminderEditForm
