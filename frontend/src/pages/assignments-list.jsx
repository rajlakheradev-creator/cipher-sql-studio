import { Link } from "react-router-dom";
import AssignmentCard from "../components/assignment-card";
import "../styles/_main.scss";
function Assignmentslist(){
  
    return(
        <div>
            <h1>Assignments</h1>
            
                
                 <div>
                    <AssignmentCard />

                 </div>


                 
                

        </div>
    );
}

export default Assignmentslist;