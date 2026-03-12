import  { useEffect, useState } from "react";
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

      {/* // ✅ key on Link (the outermost element) */}
{/* // ✅ Only wrap in Link when no id (list view) */}
{assignments.map((a) => {
  const card = (
    <div key={a.id} className="assignment">
      <p className="assignment-card__para">{a.title}</p>
      <p className="assignment-card__para">{a.description}</p>
      <span className="assignment-card__span">{a.difficulty}</span>
    </div>
  );

  return id ? card : (
    <Link key={a.id} to={`/assignments/${a.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      {card}
    </Link>
  );
})}
    </div>
  );
}
export default AssignmentCard;
