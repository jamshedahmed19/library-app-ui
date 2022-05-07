import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputField from "../../components/InputFields";
//* Add data/utils import below this comment
import { fieldNames } from "../../utils/constants/formConstants";
import { FormContext } from "../../context/FormContext";

const AddEditStudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    values,
    errors,
    handleInputChange,
    handleStudentFormSubmit,
    getStudent,
  } = useContext(FormContext);

    useEffect(() => {
      if (id) {
        getStudent(id);
      }
      // eslint-disable-next-line
    }, [id]);

  return (
    <Box sx={{ margin: "50px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} lg={12}>

          <Typography variant="h5" component="h1">
            Edit Student Details
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            placeholder="John"
            label={" First Name"}
            name={fieldNames.first_name}
            value={values.first_name}
            error={errors.first_name !== "" ? true : false}
            helperText={errors.first_name}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputField
            placeholder="Doe"
            label={"Last Name"}
            name={fieldNames.last_name}
            value={values.last_name}
            error={errors.last_name !== "" ? true : false}
            helperText={errors.last_name}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleStudentFormSubmit}>
              Update Student
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEditStudentForm;
