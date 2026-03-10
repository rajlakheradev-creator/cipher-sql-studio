import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignmentsList from "./pages/assignments-list";
import AssignmentsAttempt from "./pages/assignments-attempt";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<AssignmentsList />} />
          <Route path="/assignments" element={<AssignmentsList />} />
          <Route path="/assignments/:id" element={<AssignmentsAttempt />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
