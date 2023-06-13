import { Box, Grid, LinearProgress, ListItemText } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardContainer from "../../components/Card/CardContainer";
import CreateComments from "../../components/CreateComments/CreateComments";
import { db } from "../../firebase/firebaseConfig";

const LearnMorePage = () => {
  const [card, setCard] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { nombre, description, file, comments, votes, creator, date } = card;

  const getCardData = async () => {
    const docRef = doc(db, "projects", `${id}`);
    setLoading(true);
    try {
      const result = await getDoc(docRef);

      if (result.exists()) {
        setCard(result.data());
      }
    } catch (error: any) {
      throw Error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
  }, [id]);

  const isOwner = (comment: any) => {
    const exist = comment?.id === creator.id;
    return exist;
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {!loading ? (
        <CardContainer
          nombre={nombre}
          description={description}
          file={file}
          comments={comments}
          votes={votes}
          creator={creator}
          date={date}
          learn={false}
        />
      ) : (
        <Box marginTop={3} sx={{ width: "70%" }}>
          <LinearProgress />
        </Box>
      )}
      <CreateComments card={card} />
      {comments &&
        comments?.map((item: any) => (
          <Box marginTop={4} border={1}>
            <ListItemText>
              <Grid direction="column" container>
                <Grid width={"400px"} height={"100px"} textAlign="center" item>
                  {item.comment}
                </Grid>
                <Grid
                  item
                  sx={{
                    backgroundColor: "#bba4bf",
                  }}
                >
                  publicado por:{item.userName} |
                  {isOwner(item) ? (
                    <span
                      style={{
                        width: "150px",
                        height: "60px",
                        background: "#000",
                        borderRadius: "4px",
                      }}
                    >
                      <b style={{ color: "#bfac56" }}>Owner</b>
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </ListItemText>
          </Box>
        ))}
    </Grid>
  );
};

export default LearnMorePage;
