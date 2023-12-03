import { NameInitialsAvatar } from "react-name-initials-avatar";
import { useState, useEffect } from "react";

export const getRegisteredUsers = async () => {
  const res = await fetch("http://localhost:30/users");
  return await res.json();
};
export const Users = () => {
  return (
    <>
      <div className="activeUsers">
        <h1>Active Users</h1>
        <div className="activeUsers-users">
          <NameInitialsAvatar name="Mohamed Mankouchi" />
          <NameInitialsAvatar name="Mohamed Mankouchi" />
          <NameInitialsAvatar name="Mohamed Mankouchi" />
        </div>
      </div>

      <div className="createdUsers">
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <h1>Recently created users</h1>
          <button style={{ fontSize: "20px" }}>+</button>
        </div>

        <div className="createdUsers-users">
          <div className="users">
            <NameInitialsAvatar name="Mohamed Mankouchi" />
            <div className="users-credentials">
              <p>Mohamed Mankouchi</p>
              <p>email: mo@gmail.com</p>
            </div>
          </div>

          <div className="users">
            <NameInitialsAvatar name="Mohamed Mankouchi" />
            <div className="users-credentials">
              <p>Mohamed Mankouchi</p>
              <p>email: mo@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
