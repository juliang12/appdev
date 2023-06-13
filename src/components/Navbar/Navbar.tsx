import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import useUpload from "../../hooks/useUpload";

const Navbar = () => {
  const { currentUser } = useUpload();
  console.log(currentUser);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <AppBar color="secondary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DEVAPP
            </Typography>

            <Link to="/" component={LinkRouter} color="inherit">
              <Typography variant={"h6"}>Home</Typography>
            </Link>
            <Link to="/create" component={LinkRouter} color="inherit">
              <Typography variant={"h6"}>Crear Proyecto</Typography>
            </Link>
            <Tooltip title="Open settings">
              <IconButton onClick={handleClick}>
                <Avatar src={currentUser && currentUser.photoURL} alt="hola" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
