import React from "react";
import { Editor } from "@monaco-editor/react";
import "../styles/_main.scss"
import "../styles/_mixins.scss"
export default function SqlEditor({ value, onChange }) {
  const handleChange = (val) => {
    if (onChange) {
      onChange(val);
    }
    console.log("SQL query:", val);
  };

  return (
    <div id="SQL-editor">
      <Editor
        height="100%"
        defaultLanguage="sql"
        defaultValue="SELECT * FROM table_name;"
        value={value}
        theme="vs-dark"
        onChange={handleChange}
      />
    </div>
  );
}
