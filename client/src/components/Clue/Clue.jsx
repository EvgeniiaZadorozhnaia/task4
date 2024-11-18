import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom

function Clue({ type }) {
  return (
    <div>
      {type === "registration" ? (
        <Link to="/registration">Don't have an account? Sign up</Link>
      ) : (
        <Link to="/login">Already have an account? Sign in</Link>
      )}
    </div>
  );
}

export default Clue;
