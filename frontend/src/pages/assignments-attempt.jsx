import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./assignments-attempt.css";

import assignmentCard from "../components/assignment-card";
import hintbutton from "../components/hintbutton";
import sqlEditor from "../components/sql-editor";
import resultsTab from "../components/results-tab";
export default function AssignmentsAttempt() {
  return (
    <div id="attempt-container">
      <h1 id="attempt-container__header">Assignments Attempt</h1>
     <assignmentCard />
     <hintbutton />
     <sqlEditor />
     <resultsTab />
      <p id="attempt-container__para">This is the Assignments Attempt page.</p>
    </div>
  );
}
