import React from "react";
import { useEffect,useState } from "react";
export default function sqlEditor(){
    return(
        <div id="SQL-editor">
            <textarea id="SQL-editor__textarea" placeholder="Enter your SQL query here..."></textarea>
        </div>
    )
}