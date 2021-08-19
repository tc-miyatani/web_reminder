import React, { createRef, useEffect } from "react";

const TokenInput = () => {
  const inputRef = createRef();

  useEffect(() => {
    const token = document.getElementsByName('csrf-token')[0]?.content;
    inputRef.current.value = token;
  }, []);

  return <input ref={inputRef} name="authenticity_token" type="hidden" />;
}

export default TokenInput;
