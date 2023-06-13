import { Box, Grid, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import CardContainer from "../../components/Card/CardContainer";
import { useProjects } from "../../context/projects/ProjectsProvider";
import SearchInput from "../../components/Search/SearchInput";

const HomePage = () => {
  const { state, getProjects } = useProjects() as any;
  const { projects } = state;
  console.log(projects);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Grid container>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        margin={"1rem"}
      >
        <SearchInput />
      </Grid>

      <Grid
        container
        justifyContent="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {projects.length !== 0 ? (
          projects.map((project: any, index: number) => (
            <Grid item xs={2} sm={4} md={4}>
              <CardContainer
                learn={true}
                key={index}
                {...project}
                id={project.id}
                project={project}
              />
            </Grid>
          ))
        ) : (
          <Box marginTop={3} sx={{ width: "70%" }}>
            <LinearProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default HomePage;
