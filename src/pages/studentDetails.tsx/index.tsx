import React, {useContext, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FormContext } from "../../context/FormContext";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { paths } from '../../routes/paths';
import Skeletons from '../../components/Skeletons';

const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, getStudent, studentData } = useContext(FormContext);

  useEffect(() => {
    if (id) {
      getStudent(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Paper>
        <Box p={4}>
          {isLoading ? (
            <Skeletons count={1} />
          ) : (
            studentData && (
              <>
                <SchoolRoundedIcon fontSize="large" />
                <Typography variant="h4" component="h1">
                  {studentData.first_name + " " + studentData.last_name}
                </Typography>
              </>
            )
          )}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() =>
                navigate(paths.addEditStudent + studentData?.student_id)
              }
            >
              <EditRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default StudentDetails;