import { useState, useCallback, ChangeEvent } from "react";

type TValues = {
  [name: string]: any;
};

export const useFormAndValidation = () => {
  const [values, setValues] = useState<TValues>({});
  const [errors, setErrors] = useState<TValues>({});
  const [isValid, setIsValid] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [editMode, setEditMode] = useState<TValues>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form")!.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newEditMode = {}) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setEditMode(newEditMode);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    isHidden,
    setIsHidden,
    editMode,
    setEditMode,
  };
};
