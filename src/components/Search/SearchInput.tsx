import React, { useState } from "react";
import InputText from "../Form/InputText/InputText";
import { Form, Formik } from "formik";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/projects/ProjectsProvider";

const SearchInput = () => {
  const navigate = useNavigate();

  const handleSearch = async (values: { search: string }) => {
    navigate(`/search/${values.search}`);
  };

  return (
    <Formik
      initialValues={{
        search: "",
      }}
      onSubmit={(values) => {
        handleSearch(values);
      }}
    >
      <Form>
        <InputText label="Search" name="search" />
      </Form>
    </Formik>
  );
};

export default SearchInput;
