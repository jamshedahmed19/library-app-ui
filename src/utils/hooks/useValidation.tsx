import { useState } from 'react';
import { fieldNames } from '../constants/formConstants';
import {
  validateName,
} from '../helperfunctions/validations';

const useValidation = (values: any) => {
  const [errors, setErrors] = useState(values);
  const [error] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (
      (fieldNames.first_name ||
        fieldNames.last_name ||
        fieldNames.book_name ||
        fieldNames.author) in fieldValues
    ) {
      temp.name = validateName(fieldValues.first_name);
    }

    setErrors({
      ...temp
    });

    return Object.values(temp).every((x) => x === '');
  };
  return {
    error,
    validate,
    errors,
    setErrors
  };
};

export default useValidation;