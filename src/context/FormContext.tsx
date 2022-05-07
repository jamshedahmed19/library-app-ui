import React, { createContext, useState } from 'react';
import { updateData, getData } from '../api/API';
import { API_ENDPOINTS } from '../api/endpoints';
import useValidation from '../utils/hooks/useValidation';
import {IBook}from '../utils/interfaces/book.interface';
import {IStudent}from '../utils/interfaces/student.interface';

export interface IFormValues{
  [k: string]: string | number | null | Date;
  first_name: string;
  last_name: string;
  author: string;
  book_name: string;
  borrowed_by: string | null;
  borrowed_date: string | null | Date;
  expected_date_of_return: string | null | Date;
}

export interface IFormErrors {
    first_name: string;
    last_name: string;
    author: string;
    book_name: string;
    borrowed_by: string;
    borrowed_date: string;
    expected_date_of_return: string;
}
interface IFormContextState {
  bookData: IBook | null;
  studentData: IStudent | null;
  isLoading: boolean;
  values: IFormValues;
  errors: IFormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateInputChange: (
    newValue: Date | string | null,
    name: string,
  ) => void;
  getBook: (id: string) => void,
  getStudent: (id: string) => void,
  handleStudentFormSubmit: () => void;
  handleBookFormSubmit: () => void;
}

const defaultState: IFormContextState = {
  isLoading: false,
  bookData: null,
  studentData: null,
  values: {
    first_name: '',
    last_name: '',
    book_name: '',
    author: '',
    borrowed_by: null,
    borrowed_date: null,
    expected_date_of_return: null,
  },
  errors: {
    first_name: '',
    last_name: '',
    book_name: '',
    author: '',
    borrowed_by: '',
    borrowed_date: '',
    expected_date_of_return: '',
  },
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleDateInputChange: (
    newValue: Date | string | null,
    name: string,
  ) => {},
  getBook: (id: string) => {},
  getStudent: (id: string) => {},
  handleStudentFormSubmit: async () => {},
  handleBookFormSubmit: async () => {},
};

export const FormContext = createContext<IFormContextState>(defaultState);

export const FormContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  const [values, setValues] = useState<IFormValues>(defaultState.values);
  const [bookData, setBookData] = useState<IBook | null>(defaultState.bookData);
  const [studentData, setStudentData] = useState<IStudent | null>(defaultState.studentData);
  const { errors, validate } = useValidation(values);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);

  //* to handle Input Change
  //* @param e: React.ChangeEvent<HTMLInputElement> - event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  //* to handle Date Input Change
  //* @param newValue: Date | string | null - new value
  //* @param name: string - name of the field
  const handleDateInputChange = (newValue: Date | string | null, name: string) => {
    const newItems = { ...values };
    newItems[name] = newValue;
    setValues(newItems);
  };

  //* to reset the form
  const resetForm = () => {
    setValues(defaultState.values);
  };

  const getBook = async (id: string) => {
    setIsLoading(true);
    await getData(API_ENDPOINTS.books + "/" + id)
      .then((res) => {
        setIsLoading(false);
        console.log(res[0]);
        setBookData(res[0]);
        setValues((prevValues) => ({
          ...prevValues,
          book_name: res[0].book_name,
          author: res[0].author,
          borrowed_by: res[0].borrowed_by.toString(),
          borrowed_date: res[0].borrowed_date,
          expected_date_of_return: res[0].expected_date_of_return,
        }));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  const getStudent = async (id: string) => {
    setIsLoading(true);
    await getData(API_ENDPOINTS.students + "/" + id)
      .then((res) => {
        setIsLoading(false);
        console.log(res[0]);
        setStudentData(res[0]);
        setValues((prevValues) => ({
          ...prevValues,
          first_name: res[0].first_name,
          last_name: res[0].last_name,
        }));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  const handleBookFormSubmit = async () => {
   console.log("handleBookSubmit");
   console.log(values);
    const requestBody ={
      book_name: values.book_name,
      author: values.author,
      borrowed_by: values.borrowed_by !== null ? parseInt(values.borrowed_by) : null,
      borrowed_date: values.borrowed_date,  
      expected_date_of_return: values.expected_date_of_return,
    }
   await updateData(API_ENDPOINTS.books, requestBody)
     .then((res) => {
       resetForm();
      console.log(res);
     })
     .catch((err) => {
       console.log(err);
     });

  };

  const handleStudentFormSubmit = async () => {
   console.log("handleStudentSubmit");
   console.log(values);
    const requestBody ={
      first_name: values.first_name,
      last_name: values.last_name,
    }
    await updateData(API_ENDPOINTS.students, requestBody)
      .then((res) => {
        resetForm();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formContextData = {
    values,
    errors,
    isLoading,
    getBook,
    bookData,
    getStudent,
    studentData,
    handleInputChange,
    resetForm,
    handleBookFormSubmit,
    handleStudentFormSubmit,
    handleDateInputChange,
  };

  return (
    <FormContext.Provider value={formContextData}>
      {children}
    </FormContext.Provider>
  )
}

export default FormContextProvider;