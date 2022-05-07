import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeletons from '../../components/Skeletons';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { IBook } from '../../utils/interfaces/book.interface';
import { getData } from '../../api/API';
import { API_ENDPOINTS } from '../../api/endpoints';
import { paths } from '../../routes/paths';

const CardContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  padding: "20px",
}));

const Books: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<IBook[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBooks = async () => {
    await getData(API_ENDPOINTS.books)
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
    getBooks();
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Books List</Typography>
      </Grid>
      {isLoading ? (
        <Grid item xs={12}>
          <Skeletons count={5} />
        </Grid>
      ) : (
        data &&
        data.length > 0 &&
        data.map((book: IBook) => (
          <Grid item xs={12} key={uuid()}>
            <Paper>
              <CardContent>
                <Typography variant="h6">{book.book_name}</Typography>
                <Button
                  endIcon={<ArrowRightAltRoundedIcon />}
                  onClick={() => navigate(paths.bookDetails + book.book_id)}
                >
                  {`View Books Details`}
                </Button>
              </CardContent>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default Books;