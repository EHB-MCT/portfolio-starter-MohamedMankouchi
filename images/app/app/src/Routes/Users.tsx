import { NameInitialsAvatar } from "react-name-initials-avatar";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

type User = {
  username: string;
  email: string;
};

export const getRegisteredUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:80/users");
  return await res.json();
};
export const Users = () => {
  const users: unknown = useLoaderData();
  const registerdUsers: Array<User> = users as User[];
  return (
    <>
      <div className="activeUsers">
        <h1>Active Users</h1>
        <div className="activeUsers-users">
          <NameInitialsAvatar name="Mohamed Mankouchi" />
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
          {registerdUsers.map((el) => (
            <div className="users">
              <NameInitialsAvatar name={el.username} />
              <div className="users-credentials">
                <p>{el.username}</p>
                <p>{el.email}</p>
              </div>
            </div>
          ))}

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
