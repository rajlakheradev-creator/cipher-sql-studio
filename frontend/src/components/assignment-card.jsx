import React, { useEffect, useState } from "react";
import axios from "axios";
function AssignmentCard() {
  const [assignments, setassignments] = useState([]); // State to hold the list of assignments and([]) is the initial value of the state which is an empty array.
  useEffect(() => {
    // Fetch the list of assignments from the backend API and update the state with the fetched data.
    axios.get("http://localhost:8000/api/assignments").then((res) => {
      setassignments(res.data);
    });
  }, []);

  return (
    <div id="Assignment-card">
      <h1 id="Assignment-card__title">Title</h1>

      {assignments.map((a) => {
        return (
          <div key={a.id} className="assignment">
            <p>{a.title}</p>
            <p>{a.description}</p>
            <span>{a.difficulty}</span>
          </div>
        );
      })}
    </div>
  );
}
export default AssignmentCard;
