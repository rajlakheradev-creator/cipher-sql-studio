import React from "react";
import { useState } from "react";
import axios from "axios";
import "../styles/_main.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AssignmentCard from "../components/assignment-card";
import HintButton from "../components/hintbutton";
import SqlEditor from "../components/sql-editor";
import ResultsTab from "../components/results-tab";

export default function AssignmentsAttempt() {

  const [currentQuery, setCurrentQuery] = useState("");// State to hold the current SQL query, the hint received from the backend, the results of query execution, and a loading state to manage asynchronous operations.

  const [hint, setHint] = useState("");// State to hold the current SQL query, the hint received from the backend, the results of query execution, and a loading state to manage asynchronous operations.

  const [results, setResults] = useState([]);// State to hold the current SQL query, the hint received from the backend, the results of query execution, and a loading state to manage asynchronous operations.

  const [loading, setLoading] = useState(false);// State to hold the current SQL query, the hint received from the backend, the results of query execution, and a loading state to manage asynchronous operations.

   const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  
  const handleQueryChange = (value) => {

    setCurrentQuery(value || "");

  };// Function to handle changes in the SQL editor and update the currentQuery state accordingly.

  const handleHintClick = async () => {// Function to handle the click event of the hint button, which sends the current query to the backend and retrieves a hint based on the query.

    if (!currentQuery.trim()) {
// Check if the current query is empty or only contains whitespace. If it is, set a hint message prompting the user to write a query first and return early from the function.
      setHint("Please write a query first!");

      return;
    }

    setLoading(true);
    // Set the loading state to true to indicate that an asynchronous operation is in progress while fetching the hint from the backend.
    try {
useEffect(() => {
    axios.get(`http://localhost:8000/api/assignments/${id}`)
      .then(res => setAssignment(res.data[0]))
      .catch(err => console.error(err));
  }, [id]);// useEffect hook to fetch the assignment details from the backend API when the component mounts or when the id parameter changes. The fetched assignment data is stored in the assignment state.

  const response = await axios.post("http://localhost:8000/api/hints", {
    question: assignment?.description || "",
    currentQuery: currentQuery,
    schema: "",
    assignmentId: id,
  });// Make a POST request to the backend API to fetch a hint based on the current query and assignment description. The response is expected to contain a hint, which is then set in the hint state.

      setHint(response.data.hint);
    } catch (err) {
      setHint("Failed to get hint. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteClick = async () => {
    if (!currentQuery.trim()) {
      alert("Please write a query first!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/execute", {
        query: currentQuery,
      });
      setResults(response.data);
    } catch (err) {
      setResults([
        { error: err.response?.data?.error || "Query execution failed" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="attempt-container">
      <h1 id="attempt-container__header">Assignments Attempt</h1>
      <AssignmentCard id={id}/>
      <HintButton onClick={handleHintClick} loading={loading} />
      {hint && (
        <div className="hint-display">
          <p>{hint}</p>
        </div>
      )}
      <SqlEditor value={currentQuery} onChange={handleQueryChange} />
      <button
        onClick={handleExecuteClick}
        disabled={loading}
        className="execute-button"
      >
        {loading ? "Executing..." : "Execute Query"}
      </button>
      <ResultsTab results={results} />
      <p id="attempt-container__para">This is the Assignments Attempt page.</p>
    </div>
  );
}
