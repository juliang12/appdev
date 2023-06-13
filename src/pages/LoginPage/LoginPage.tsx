import { Grid, IconButton } from "@mui/material";
import { useState } from "react";
import GenericForm from "../../components/Form/GenericForm/GenericForm";

const LoginPage = () => {
  const [hide, setHide] = useState<boolean>(false);

  const handleClick = () => {
    setHide(!hide);
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      direction="column"
      margin="15px"
      height={"100%"}
    >
      <GenericForm typeForm={hide} />
      {!hide ? (
        <Grid marginTop={"1rem"}>
          <IconButton onClick={handleClick}>Crear una cuenta</IconButton>
        </Grid>
      ) : (
        <Grid marginTop={"1rem"}>
          <IconButton onClick={handleClick}>Iniciar Sesion</IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default LoginPage;
