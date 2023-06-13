import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { CreateValues } from "../models/interface/form";
import useUpload from "./useUpload";

const useFirestore = (urlImage: any) => {
  const { currentUser } = useUpload();
  const [loading, setLoading] = useState(false);
  const ref = collection(db, "projects");
  const navigate = useNavigate();

  const addNewProject = async (values: CreateValues) => {
    const newValue = {
      ...values,
      file: urlImage,
      creator: { id: currentUser.uid, name: currentUser.displayName },
      comments: [],
      create: Date.now(),
      votes: 0,
      date: new Date().toLocaleDateString(),
    };
    setLoading(true);
    try {
      await addDoc(ref, newValue);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return { addNewProject, loading };
};

export default useFirestore;
