import { useState } from "react";
import useLocalStorage from "./useLocalStorage"

const KEY = "React Plants: Shopping Cart"
const initialValue = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const useForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [values, setValues] = useLocalStorage(KEY, initialValue);

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
  };


  return [values, handleChanges, handleSubmit, showSuccessMessage]
}

export default useForm