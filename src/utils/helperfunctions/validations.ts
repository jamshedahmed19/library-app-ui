import { messages } from '../constants/formConstants';
import {
  isNameValid,
} from '../constants/regex';

export const validateName = (fieldValue: string) => {
  return fieldValue.trim() === ''
    ? messages.isRequired
    : isNameValid(fieldValue)
    ? ''
    : messages.notValid;
};
