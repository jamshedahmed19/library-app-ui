import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import BookDetailsSkeletons from "../../components/Skeletons/BookDetailsSkeleton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { FormContext } from "../../context/FormContext";
import { paths } from "../../routes/paths";

const CardContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
}));

const BookDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, getBook, bookData } = useContext(FormContext);

  useEffect(() => {
    if (id) {
      getBook(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Paper>
        <Box p={4}>
          {isLoading ? (
            <BookDetailsSkeletons />
          ) : (
            bookData && (
              <>
                <MenuBookRoundedIcon fontSize="large" />
                <Typography variant="h4" component="h1">
                  {bookData.book_name}
                </Typography>
                <CardContent>
                  <Typography variant="h6">
                    Author: {bookData.author}
                  </Typography>
                  <Typography variant="subtitle2">
                    Date of borrow:{" "}
                    {new Date(bookData.date_of_borrow).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2">
                    Expected date of return:{" "}
                    {new Date(
                      bookData.expected_date_of_return
                    ).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption">
                    Borrowed by: {bookData.borrowed_by}
                  </Typography>
                </CardContent>
              </>
            )
          )}
          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => navigate(paths.addEditBook + bookData?.book_id)}
            >
              <EditRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default BookDetails;
