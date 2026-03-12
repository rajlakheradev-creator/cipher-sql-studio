import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignmentCard from "../components/assignment-card";
import "../styles/_main.scss";

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/assignments")
      .then((res) => {
        setAssignments(Array.isArray(res.data) ? res.data : [res.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading assignments...</div>;

  return (
    <div id="assignment-list">
      <h1 id="assignment-list__title">Assignments</h1>
      <div id="assignment-list__cards">
        {assignments.map((a) => (
          <AssignmentCard key={a.id} />
        ))}
      </div>
    </div>
  );
}
