import React from "react";

export default function ResultsTab({ results = [] }) {
  return (
    <div id="Results-tab">
      <h1 id="Results-tab__title">Results</h1>
      {results.length > 0 ? (
        <div className="results-table">
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      ) : (
        <p id="Results-tab__description">Execute a query to see results.</p>
      )}
    </div>
  );
}
