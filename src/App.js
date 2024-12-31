import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/connection/Login";
import Signup from "./components/connection/Signup";
import "./App.css";
import MainPage from "./components/MainPage";
import Dashboard from "./components/dashboard/Dashboard";
import Conferences from "./components/conferences/Conferences";
import Conference from "./components/conferences/Conference";
import CreationConference from "./components/conferences/CreationConference";
import EditConference from "./components/conferences/EditConference";
import DeposerSoumission from "./components/soumissions/DeposerSoumission";
import ListeSoumissions from "./components/soumissions/ListeSoumissions";
import SoumissionsAEvaluer from "./components/soumissions/SoumissionsAEvaluer";
import EvaluationSoumission from "./components/evalutations/EvaluationSoumission";
import EvaluationsList from "./components/evalutations/EvaluationsList";
import MesSoumissionsConference from "./components/soumissions/MesSoumissionsConference";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainPage />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/conference/:idConference" element={<Conference />} />
            <Route
              path="/creationConference"
              element={<CreationConference />}
            />
            <Route
              path="/edit-conference/:idConference"
              element={<EditConference />}
            />
            <Route
              path="/posersoumission/:idConference"
              element={<DeposerSoumission />}
            />
            <Route
              path="/evaluation/:soumId/:evaluatorId"
              element={<EvaluationSoumission />}
            />
            <Route
              path="/liste_soumissions/:idConference"
              element={<ListeSoumissions />}
            />
            <Route
              path="/ListeDesSoumisisonsAEvaluer/:conferenceId/:evaluatorId"
              element={<SoumissionsAEvaluer />}
            />
            <Route
              path="/liste_des_evaluations/:submissionId"
              element={<EvaluationsList />}
            />
            <Route
              path="mes_soumissions/:authorId/:conferenceId"
              element={<MesSoumissionsConference />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
