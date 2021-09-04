import React, { createRef, useState } from "react";
import PropTypes from "prop-types";

import ReminderForm from "form/ReminderForm";
import MessageDialog from "common/MessageDialog";
import ButtonToggleLoading from "common/ButtonToggleLoading";

import axios from 'modules/axios_with_csrf';

const ReminderAddForm = (props) => {
  const formRef = createRef();

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
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
    axios.post('/api/reminders', formData)
      .then(res => {
        console.log(res.data);
        if (res.data?.is_success){
          setApiResponse({msg: res.data?.msg, is_success: res.data.is_success});
        } else {
          const err_msg = res.data?.msg
                        + res.data?.error_messages?.join('!')
                        + '!';
          setApiResponse({msg: err_msg, is_success: res.data.is_success});
        }
        setIsLoading(false);
        setOpen(true);
      })
      .catch(error => {
        setApiResponse({msg: '通信エラーが発生しました。', is_success: false});
        setIsLoading(false);
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
    if (apiResponse?.is_success) {
      location.href = '/';
    }
  };

  const handleChange = obj => props.onChange(obj);

  return (
    <>
      <ReminderForm ref={formRef} onChange={handleChange} isLoading={isLoading}
        title="リマインダー作成フォーム"
        reminder={props.reminder}
      >
        <ButtonToggleLoading isLoading={isLoading} onClick={handleAdd}>
          登録
        </ButtonToggleLoading>
      </ReminderForm>
      <MessageDialog open={open} onClose={handleClose} msg={apiResponse.msg} />
    </>
  );
}

ReminderAddForm.propTypes = {
  reminder : PropTypes.object,
  onChange : PropTypes.func,
};

export default ReminderAddForm
