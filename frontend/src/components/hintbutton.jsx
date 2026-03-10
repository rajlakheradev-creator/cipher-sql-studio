import React from "react";

export default function HintButton({ onClick, loading }) {
  return (
    <div id="Hint-button">
      <button id="Hint-button__button" onClick={onClick} disabled={loading}>
        {loading ? "Loading..." : "Get Hint"}
      </button>
    </div>
  );
}
