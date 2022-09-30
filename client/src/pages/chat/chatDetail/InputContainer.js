import React, { useState, useCallback } from "react";

const InputContainer = (props) => {
  const [msg, setMsg] = useState("");
  const { sendMessage } = props;

  const handler = useCallback((e) => {
    setMsg(e.target.value);
  }, []);
  // input창에 입력한 값을 msg에 넣는다. (useCallback 안써도 될듯?)

  return (
    <>
      <input type="text" value={msg} onChange={handler} />
      <input
        type="button"
        onClick={() => {
          sendMessage(msg);
          setMsg("");
        }}
      >
        전송
      </input>
    </>
  );
};

export default InputContainer;
