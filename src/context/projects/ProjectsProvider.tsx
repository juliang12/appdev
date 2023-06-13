import { collection, getDocs } from "firebase/firestore";
import { useContext, useReducer } from "react";
import { types } from "../../actions/types";
import { db } from "../../firebase/firebaseConfig";
import { ProjectsContext } from "./ProjectsContext";
import { reducerProjects } from "./reducerProjects";

interface Props {
  children: React.ReactNode;
}

export const INITIAL_STATE = {
  projects: [],
};

const ProjectsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducerProjects, INITIAL_STATE);
  const ref = collection(db, "projects");

  const getProjects = async () => {
    try {
      const querySnapshot = await getDocs(ref);
      const getData = querySnapshot.docs;
      const result = getData.map((docs) => ({ ...docs.data(), id: docs.id }));
      dispatch({ type: types.GET_PROJECTS, payload: result });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProjectsContext.Provider value={{ state, dispatch, getProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  return context;
};

export { ProjectsProvider };
