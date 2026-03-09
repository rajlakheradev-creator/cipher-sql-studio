import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";// Importing necessary libraries and hooks for making HTTP requests and managing state in the component.
import assignmentCard from "../components/assignment-card";

function Assignmentslist(){
  
    return(
        <div>
            <h1>Assignments</h1>
            
                
                 <ul>

                    <assignmentCard />

                 </ul>
                

        </div>
    );
}

export default Assignmentslist;