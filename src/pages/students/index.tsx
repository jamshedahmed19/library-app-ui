import React, {useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import {useNavigate} from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { getData } from '../../api/API';
import { API_ENDPOINTS } from '../../api/endpoints';
import { IStudent } from '../../utils/interfaces/student.interface';
import Skeletons from '../../components/Skeletons';
import { paths } from '../../routes/paths';

const CardContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  padding: "20px",
}));

const Students: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IStudent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStudents = async () => {
    await getData(API_ENDPOINTS.students)
      .then((res) => {
        setIsLoading(false);
        setData(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getStudents();
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Students List</Typography>
      </Grid>
      {isLoading ? (
        <Grid item xs={12}>
          <Skeletons count={5} />
        </Grid>
      ) : (
        data &&
        data.length > 0 &&
        data.map((student: IStudent) => (
          <Grid item xs={12} key={uuid()}>
            <Paper>
              <CardContent>
                <Typography variant="h6">
                  {student.first_name + " " + student.last_name}
                </Typography>
                <Button
                  endIcon={<ArrowRightAltRoundedIcon />}
                  onClick={() => navigate(paths.studentDetails + student.student_id)}
                >
                  {`View Student Details`}
                </Button>
              </CardContent>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default Students;