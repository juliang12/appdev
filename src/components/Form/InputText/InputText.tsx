import { Grid, TextField } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import React from "react";

interface InputTextProps {
  label: string;
  name: string;
  [x: string]: any;
}

const InputText = ({ label, ...props }: InputTextProps) => {
  const [field] = useField(props);
  return (
    <Grid container direction="column">
      <TextField label={label} {...field} {...props} variant="standard" />
      <ErrorMessage name={props.name} component="span" />
    </Grid>
  );
};

export default InputText;
