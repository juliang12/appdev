import { Button, Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import InputText from "../InputText/InputText";
import * as Yup from "yup";
import { auth } from "../../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

interface ValuesProps {
  name?: string;
  email: string;
  password: string;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const handleSubmitAndLogin = async (values: ValuesProps) => {
    const { email, password, name } = values;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, {
        displayName: name,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmitAndLogin(values)}
      validationSchema={Yup.object({
        name: Yup.string().required("Requerido!"),
        email: Yup.string()
          .email("El formato no es valido")
          .required("Requerido!"),
        password: Yup.string()
          .min(8, "Debe contener minimo 8 caracteres")
          .required("Requerido!"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Password must match")
          .required("Requerido!"),
      })}
    >
      <Form>
        <Grid item>
          <InputText name="name" label="Nombre" variant="standard" />
        </Grid>
        <Grid item>
          <InputText name="email" label="Email" variant="standard" />
        </Grid>
        <Grid item>
          <InputText name="password" label="Password" variant="standard" />
        </Grid>
        <Grid item>
          <InputText
            name="confirmPassword"
            label="Confirmar Password"
            variant="standard"
          />
        </Grid>
        <Grid item marginTop={"1rem"}>
          <Button type="submit" variant="outlined" color="secondary">
            Registrar
          </Button>
        </Grid>
      </Form>
    </Formik>
  );
};

export default Register;
