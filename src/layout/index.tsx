import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';

interface ILayoutProps {
}

const Layout: React.FC<ILayoutProps> = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ marginTop: "50px" }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
