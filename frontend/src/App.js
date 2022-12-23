import React from "react";
import "./styles.css";

import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import ViewFile from "./pages/View_File";
import Courses from "./pages/Courses";
import Learning_outcomes from "./pages/Learning_outcomes";
import Learning_units from "./pages/Learning_units";
import Engineering_disciplines from "./pages/Engineering_disciplines";
import Study_Programmes from "./pages/Study_Programmes";
import Study_materials from "./pages/Study_materials";
import Content from "./pages/Content";
import Add_Discipline from "./pages/Add_Discipline";
import Add_LearningOutcome from "./pages/Add_LearningOutcome";
import Add_Course from "./pages/Add_Course";
import Add_LearningUnit from "./pages/Add_LearningUnit";
import Update_Discipline from "./pages/Update_Discipline";
import Update_Course from "./pages/Update_Course";
import Update_LearningUnit from "./pages/Update_LearningUnit";
import Update_LearningOutcome from "./pages/Update_LearningOutcome";
import Update_Study_Material from "./pages/Update_Study_Material";
import Create_Sheet from "./pages/Create_Sheet";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add" component={Create_Sheet} />
          <Route path="/curriculum_mapping" component={Study_Programmes} />
          <Route path="/engineering_disciplines" component={Engineering_disciplines} />
          <Route path="/courses" component={Courses} />
          <Route path="/learning_units" component={Learning_units} />
          <Route path="/learning_outcomes" component={Learning_outcomes} />
          <Route path="/study_materials" component={Study_materials} />
          <Route path="/add_study_material" component={Content} />
          <Route path="/add_discipline" component={Add_Discipline} />
          <Route path="/add_learning_outcome" component={Add_LearningOutcome} />
          <Route path="/add_course" component={Add_Course} />
          <Route path="/add_learning_unit" component={Add_LearningUnit} />
          <Route path="/discipline" component={Update_Discipline} />
          <Route path="/course" component={Update_Course} />
          <Route path="/learning_unit" component={Update_LearningUnit} />
          <Route path="/learning_outcome" component={Update_LearningOutcome} />
          <Route path="/study_material" component={Update_Study_Material} />
          <Route path="/file/:id" component={ViewFile} />
          

        </Switch>
      </Router>
    </div>
  );
}
