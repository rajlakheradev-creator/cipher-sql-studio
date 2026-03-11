import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function AssignmentCard({ id }) {
  const [assignments, setassignments] = useState([]); // State to hold the list of assignments and([]) is the initial value of the state which is an empty array.
  useEffect(() => {
    const url = id
      ? `http://localhost:8000/api/assignments/${id}`
      : `http://localhost:8000/api/assignments`;

    axios.get(url).then((res) => {
      // API returns array in both cases
      setassignments(Array.isArray(res.data) ? res.data : [res.data]);
    }).catch(err => console.error(err));
  }, [id]);



  return (
    <div id="Assignment-card">
      <h1 id="Assignment-card__title">Title</h1>

      {assignments.map((a) => {
        return (
          <Link to={`/assignments/${a.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div key={a.id} className="assignment">
            <p>{a.title}</p>
            <p>{a.description}</p>
            <span>{a.difficulty}</span>
          </div>
          </Link>
        );
      })}
    </div>
  );
}
export default AssignmentCard;
