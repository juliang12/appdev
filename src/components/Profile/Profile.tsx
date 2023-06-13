import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import useUpload from "../../hooks/useUpload";
import { transformToDate } from "../../utils/transformToDate";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, upload } = useUpload();
  const [photoUrl, setPhotoUrl] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const uploadAvatar = async (e: any) => {
    if (e.target.files[0]) {
      upload(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setPhotoUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <Paper elevation={2}>
      <Grid
        container
        justifyContent={"center"}
        direction="column"
        alignItems="center"
      >
        <Grid item marginTop={2}>
          <Typography variant="h3" fontFamily="Montserrat">
            Profile
          </Typography>
        </Grid>
        <Grid
          direction="column"
          container
          alignItems="center"
          justifyContent={"center"}
          marginTop={2}
        >
          <Avatar
            src={currentUser ? currentUser.photoURL : ""}
            sx={{ width: 150, height: 150, border: "2px solid white" }}
          />
          <input type="file" onChange={(e) => uploadAvatar(e)} />
        </Grid>
        <Grid item marginTop={2}>
          <Typography variant="h6">
            {currentUser && currentUser.displayName}
          </Typography>
          <Typography variant="h6">
            Usuario desde:{" "}
            {currentUser && transformToDate(currentUser?.metadata.createdAt)}
          </Typography>
        </Grid>
        <Grid container direction="column" marginTop="2rem" alignItems="center">
          <Grid item margin="10px">
            <Button color="secondary">Editar Cuenta</Button>
          </Grid>
          <Grid item margin="5px">
            <Button onClick={handleLogout} color="secondary">
              Desconectarse
            </Button>
          </Grid>
          <Grid item margin="5px">
            <Button color="secondary">Eliminar Cuenta</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Profile;
