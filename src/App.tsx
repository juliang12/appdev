import Navbar from "./components/Navbar/Navbar";
import { Grid } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Footer from "./components/Footer/Footer";

import CreateForm from "./components/Form/CreateForm/CreateForm";
import { ProjectsProvider } from "./context/projects/ProjectsProvider";
import LearnMorePage from "./pages/learnMorePage/LearnMorePage";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <Grid container>
      <ProjectsProvider>
        <Router>
          <Navbar />
          <Grid container justifyContent="center" sx={{ height: "100%" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create" element={<CreateForm />} />
              <Route path="/:id" element={<LearnMorePage />} />
              <Route path="/search/:search" element={<SearchPage />} />
            </Routes>
          </Grid>
          <Footer />
        </Router>
      </ProjectsProvider>
    </Grid>
  );
}

export default App;
