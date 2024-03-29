import { ChangeEvent, useCallback, useState } from "react";

type Values = {
  name?: string;
  password?: number;
  email?: string;
  token?: string;
};

type Errors = Record<string, string>;
type EditMode = Record<string, boolean>;

export const useFormAndValidation = () => {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [isValid, setIsValid] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [editMode, setEditMode] = useState<EditMode>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form")?.checkValidity() ?? false);
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
