import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../../context/projects/ProjectsProvider";
import { Box, Grid, LinearProgress } from "@mui/material";
import CardContainer from "../../components/Card/CardContainer";

const SearchPage = () => {
  const { state } = useProjects() as any;
  const { projects } = state;
  const [searchList, setSearchList] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    const filter = projects.filter((item: any) =>
      item.nombre.toLowerCase().includes(search?.toLocaleLowerCase())
    );
    setSearchList(filter);
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {searchList.length !== 0 ? (
        searchList.map((project: any, index: number) => (
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
  );
};

export default SearchPage;
