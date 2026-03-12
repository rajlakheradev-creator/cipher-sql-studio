// ✅ assignments-attempt.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/_main.scss";

import AssignmentCard from "../components/assignment-card";
import HintButton from "../components/hintbutton";
import SqlEditor from "../components/sql-editor";
import ResultsTab from "../components/results-tab";

export default function AssignmentsAttempt() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [currentQuery, setCurrentQuery] = useState("");
  const [hint, setHint] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ useEffect at top level, NOT inside a function
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/assignments/${id}`)
      .then((res) => setAssignment(res.data[0]))
      .catch((err) => console.error(err));
  }, [id]);

  const handleQueryChange = (value) => {
    setCurrentQuery(value || "");
  };

  const handleHintClick = async () => {
    if (!currentQuery.trim()) {
      setHint("Please write a query first!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/hints", {
        question: assignment?.description || "",
        currentQuery: currentQuery,
        schema: "",
        assignmentId: id,
      });
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
      <AssignmentCard id={id} />
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
    </div>
  );
}