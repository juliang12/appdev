import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { auth, storage } from "../firebase/firebaseConfig";

interface PropsUpload {
  file: string;
  currentUser: string;
  setLoading?: boolean;
}

const useUpload = () => {
  const [currentUser, setcurrentUser] = useState<any>(null);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => setcurrentUser(user));
    return unSub;
  }, []);

  async function upload(file: any) {
    const fileRef = ref(storage, currentUser.uid + ".jpg");
    await uploadBytes(fileRef, file);

    const photoUrl = await getDownloadURL(fileRef);
    await updateProfile(currentUser, { photoURL: photoUrl });
  }

  async function uploadProyectImage(file: any) {
    const fileRef = ref(storage, file.name);

    await uploadBytes(fileRef, file);

    const photoUrl = await getDownloadURL(fileRef);
    return photoUrl;
  }
  return { currentUser, upload, uploadProyectImage };
};

export default useUpload;
