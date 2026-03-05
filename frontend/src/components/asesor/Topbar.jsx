import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./topbar.css";

export default function Topbar() {
  const { user } = useContext(AuthContext);

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("")
    : "AA";

  return (
    <div className="topbar">
      <div className="right">
        <div className="bell">
          🔔
          <span className="badge">3</span>
        </div>
        <span className="name">{user.name}</span>
        <div className="avatar">{initials}</div>
      </div>
    </div>
  );
}