import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import InputField from "../../components/InputFields";
//* Add data/utils import below this comment
import { fieldNames } from "../../utils/constants/formConstants";
import { FormContext } from "../../context/FormContext";

const AddEditBookForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    values,
    errors,
    handleInputChange,
    handleDateInputChange,
    handleBookFormSubmit,
    getBook,
  } = useContext(FormContext);

    useEffect(() => {
      if (id) {
        getBook(id);
      }
      // eslint-disable-next-line
    }, [id]);

  return (
    <Box sx={{ margin: "50px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <Typography variant="h5" component="h1">
            Edit Book Details
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            label={"Book Name"}
            name={fieldNames.book_name}
            value={values.book_name}
            error={errors.book_name !== "" ? true : false}
            helperText={errors.book_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            label={"Author Name"}
            name={fieldNames.author}
            value={values.author}
            error={errors.author !== "" ? true : false}
            helperText={errors.author}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            label={"Borrowed By"}
            name={fieldNames.borrowed_by}
            value={values.borrowed_by}
            helperText={errors.borrowed_by}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Borrowed Date"
              value={values.borrowed_date}
              onChange={(newValue) => {
                handleDateInputChange(newValue, fieldNames.date_of_borrow);
              }}
              renderInput={(params) => <InputField size="small" {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Expected Date Of Return"
              value={values.expected_date_of_return}
              onChange={(newValue) => {
                handleDateInputChange(
                  newValue,
                  fieldNames.expected_date_of_return
                );
              }}
              renderInput={(params) => <InputField size="small" {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleBookFormSubmit}>
              Update Book
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEditBookForm;
