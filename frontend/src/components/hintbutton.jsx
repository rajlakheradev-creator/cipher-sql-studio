import React from "react";
import "../styles/_main.scss"
import "../styles/_mixins.scss"
export default function HintButton({ onClick, loading }) {
  return (
    <div id="Hint-button">
      <button id="Hint-button__button" onClick={onClick} disabled={loading}>
        {loading ? "Loading..." : "Get Hint"}
      </button>
    </div>
  );
}
