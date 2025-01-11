// inputHandlers.js

import { update } from "../../../store/slices/TableSlice";

export const handleChange =
  (inputValue, setInputValue, dispatch, params) => (e) => {
    const updatedInputValue = {
      ...inputValue,
      [e.target.name]: e.target.value,
    };
    setInputValue(updatedInputValue);
    dispatch(update({ id: params.id, currentData: updatedInputValue }));
  };
