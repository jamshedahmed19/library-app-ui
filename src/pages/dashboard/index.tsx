import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CategoryCard from '../../components/CategoryCard';
import { paths } from '../../routes/paths';

const Dashboard: React.FC = () => {
const navigate = useNavigate();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <CategoryCard
          title="Books"
          Icon={MenuBookRoundedIcon}
          handleClick={() => navigate(paths.books)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CategoryCard
          title="Students"
          Icon={SchoolRoundedIcon}
          handleClick={() => navigate(paths.students)}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;