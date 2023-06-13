import { types } from "../../actions/types";

export const reducerProjects = (state: any, action: any) => {
  switch (action.type) {
    case types.GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case types.USER_VOTED:
      const newState = action.payload;
      return {
        ...state,
        projects: state.projects.map((project: any) =>
          project.id === newState.id ? newState : project
        ),
      };
    default:
      state;
  }
};
