import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";// Importing necessary libraries and hooks for making HTTP requests and managing state in the component.
import AssignmentCard from "../components/assignment-card";
import "../styles/_main.scss";
function Assignmentslist(){
  
    return(
        <div>
            <h1>Assignments</h1>
            
                
                 <ul>

                    <AssignmentCard />

                 </ul>
                

        </div>
    );
}

export default Assignmentslist;