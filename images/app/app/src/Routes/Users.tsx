import { NameInitialsAvatar } from "react-name-initials-avatar";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React from "react";
type User = {
  id: number;
  username: string;
  email: string;
};

type ActiveUser = {
  id: number;
  username: string;
};

export const getRegisteredUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:80/users");
  return await res.json();
};
export const Users = () => {
  const [createdUsers, setCreatedUsers] = useState<User[]>();
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>();
  const [show, setShow] = useState(false);
  const users: unknown = useLoaderData();
  const registerdUsers: Array<User> = users as User[];

  useEffect(() => {
    setCreatedUsers(registerdUsers);
  }, []);
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Create user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="John123" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </Modal>
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
        <div
          className="createdUsers-container"
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <h1>Recently created users</h1>
          <button onClick={() => setShow(true)} style={{ fontSize: "20px" }}>
            +
          </button>
        </div>

        <div className="createdUsers-users">
          {createdUsers?.map((el) => (
            <div key={el.id} className="users">
              <NameInitialsAvatar name={el.username} />
              <div className="users-credentials">
                <p>{el.username}</p>
                <p>{el.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
