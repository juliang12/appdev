import { Button, Grid } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useProjects } from "../../context/projects/ProjectsProvider";
import { db } from "../../firebase/firebaseConfig";
import useUpload from "../../hooks/useUpload";

const initialValues = {
  comments: "",
};

const CreateComments = ({ card }: any) => {
  const { currentUser } = useUpload();
  const params = useParams();
  console.log(card);
  const { comments, creator } = card;

  const handleComments = async (values: { comments: string }) => {
    const { comments: comentario } = values;
    try {
      const ref = doc(db, "projects", `${params.id}`);

      const commentary = {
        userName: currentUser.displayName,
        id: currentUser.uid,
        comment: comentario,
      };

      const newComment = [...comments, commentary];
      await updateDoc(ref, {
        comments: newComment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleComments(values)}
      validationSchema={Yup.object({
        comments: Yup.string()
          .min(8, "Debe contener minimo 8 caracteres")
          .required("Requerido!"),
      })}
    >
      <Form>
        <Grid item>
          <Field as="textarea" rows={10} cols={50} name="comments" />
          <ErrorMessage name="comments" component="span" />
        </Grid>
        <Grid item marginTop={"1rem"}>
          <Button type="submit" variant="outlined" color="secondary">
            Comentar
          </Button>
        </Grid>
      </Form>
    </Formik>
  );
};

export default CreateComments;
