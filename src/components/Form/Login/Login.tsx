import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import InputText from "../InputText/InputText";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

interface ValuesProps {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const handleSubmitAndLogin = async (values: ValuesProps) => {
    const { email, password } = values;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      return response.user;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmitAndLogin(values)}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("El formato no es valido")
          .required("Requerido!"),
        password: Yup.string()
          .min(8, "Debe contener minimo 8 caracteres")
          .required("Requerido!"),
      })}
    >
      <Form>
        <Grid item>
          <InputText name="email" label="Email" variant="standard" />
        </Grid>
        <Grid item>
          <InputText name="password" label="Password" variant="standard" />
        </Grid>
        <Grid item marginTop={"1rem"}>
          <Button type="submit" variant="outlined" color="secondary">
            Iniciar Sesion
          </Button>
        </Grid>
      </Form>
    </Formik>
  );
};

export default Login;
