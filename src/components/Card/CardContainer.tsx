import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { BiLike } from "react-icons/bi";
import { TfiComments } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { types } from "../../actions/types";
import { useProjects } from "../../context/projects/ProjectsProvider";
import { db } from "../../firebase/firebaseConfig";
import useUpload from "../../hooks/useUpload";

export interface CardDataProps {
  nombre: string;
  description: string;
  file: string;
  creator: { id: string; name: string };
  votes: number;
  comments: number[];
  date: string;
  project?: any;
  id?: string;
  learn: boolean;
}

const CardContainer = ({
  nombre,
  description,
  file,
  creator,
  votes,
  comments,
  date,
  project,
  id,
  learn,
}: CardDataProps) => {
  const { state, dispatch } = useProjects() as any;
  const { currentUser } = useUpload();
  const navigate = useNavigate();

  const handleVote = async () => {
    const ref = doc(db, "projects", `${id}`);
    const exist = project.voted === currentUser.uid;

    if (!exist) {
      const newVote = { ...project, votes: votes + 1, voted: currentUser.uid };
      await updateDoc(ref, newVote);
      dispatch({ type: types.USER_VOTED, payload: newVote });
    }
  };

  const handleClick = () => {
    navigate(`${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Typography fontSize={16} variant="h6">
        <b>Creador:</b>
        {creator?.name}
      </Typography>
      <Typography fontSize={16} variant="h6">
        <b>fecha de publicacion:</b>
        {date && date}
      </Typography>
      <CardMedia sx={{ height: 140 }} image={file}></CardMedia>
      <CardContent>
        <Typography variant="h4" component="div">
          {nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleVote} size="small">
          <BiLike size={"30px"} />
          {votes && votes}
        </Button>
        {learn && (
          <Button onClick={handleClick} size="small">
            Learn More
          </Button>
        )}
        <Button size="small">
          <TfiComments size={"30px"} /> <br /> {comments && comments.length}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardContainer;
