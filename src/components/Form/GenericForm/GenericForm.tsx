import Login from "../Login/Login";
import Register from "../Register/Register";

const GenericForm = ({ typeForm }: any) => {
  return <>{!typeForm ? <Login /> : <Register />}</>;
};

export default GenericForm;
