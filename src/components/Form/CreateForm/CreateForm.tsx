import { Formik, Form, useFormik, useFormikContext, Field } from "formik";
import * as Yup from "yup";
import React, { ChangeEvent, useState } from "react";
import { Box, Button, Grid, Input, LinearProgress } from "@mui/material";
import InputText from "../InputText/InputText";
import { CreateValues } from "../../../models/interface/form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import useUpload from "../../../hooks/useUpload";
import useFirestore from "../../../hooks/useFirestore";
import { ProgressBar } from "react-toastify/dist/components";

const initialValues = {
  nombre: "",
  file: "",
  description: "",
};
const CreateForm = () => {
  const { uploadProyectImage, currentUser } = useUpload();
  const [urlImage, setUrlImage] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const { addNewProject, loading } = useFirestore(urlImage);

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    setImageLoader(true);
    if (file) {
      const url: any = await uploadProyectImage(file);
      setUrlImage(url);
    }
    setImageLoader(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => addNewProject(values)}
    >
      {({ values }) => (
        <Form>
          <Grid item>
            <InputText
              name="nombre"
              label="Nombre Proyecto"
              variant="standard"
            />
          </Grid>
          <Grid item>
            {!imageLoader ? (
              <Button>
                <Field
                  type="file"
                  name="file"
                  onChange={(e: any) => handleFile(e)}
                />
              </Button>
            ) : (
              <LinearProgress />
            )}
          </Grid>
          <Grid item>
            <InputText
              name="description"
              label="Descripcion del Proyecto"
              variant="standard"
            />
          </Grid>
          <Grid item marginTop={"1rem"}>
            <Button type="submit" variant="outlined" color="secondary">
              Crear Proyecto
            </Button>
          </Grid>
          <Box marginTop={3} sx={{ width: "100%" }}>
            {loading && <LinearProgress />}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateForm;
