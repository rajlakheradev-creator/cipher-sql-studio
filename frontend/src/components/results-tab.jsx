import React from "react";
import "../styles/_main.scss"
import "../styles/_mixins.scss"
// results-tab.jsx
export default function ResultsTab({ results = [] }) {
  return (
    <div id="Results-tab">
      <h1 id="Results-tab__title">Results</h1>
      {results.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              {/* Extracting headers from the first object keys */}
              {Object.keys(results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((value, j) => (
                  <td key={j}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p id="Results-tab__description">Execute a query to see results.</p>
      )}
    </div>
  );
}