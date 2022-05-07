import React from "react";
import {useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { paths } from "../../routes/paths";

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate(paths.dashboard)}
            >
              LIBRARY APP
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
