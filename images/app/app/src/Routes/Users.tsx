import { NameInitialsAvatar } from "react-name-initials-avatar";
import { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

type User = {
  id: number;
  username: string;
  email: string;
  createdBy: string;
};

type ActiveUser = {
  socketId: number;
  username: string;
};

type userInput = {
  username: string;
  email: string;
  createdBy: string;
};

export const getRegisteredUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:80/users");
  return await res.json();
};
export const Users = () => {
  const users: unknown = useLoaderData();
  const registerdUsers: Array<User> = users as User[];
  const [createdUsers, setCreatedUsers] = useState<User[]>(registerdUsers);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [show, setShow] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [inputs, setInputs] = useState<userInput>({
    username: "",
    email: "",
    createdBy: sessionStorage.getItem("username") || "",
  });
  const oldInput = useRef<HTMLInputElement>(null);
  const newInput = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    if (inputs.username == "" || inputs.email == "") {
      return toast.error("Please fill in the missing fields");
    }
    socket.emit("sendCreatedUser", inputs);
    setShow(false);
    setInputs({
      username: "",
      email: "",
      createdBy: sessionStorage.getItem("username") || "",
    });
  };

  const handleDelete = (username: string) => {
    fetch(`http://localhost:80/users/${username}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("User deleted");
        socket.emit("refreshData");
      });
  };

  const handleUpdate = () => {
    const newUsername = newInput?.current?.value;
    const oldUsername = oldInput?.current?.children[0].innerHTML;

    fetch(`http://localhost:80/users/${oldUsername}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        socket.emit("refreshData");
        setShowChange(false);
      });
  };
  useEffect(() => {
    socket.connect();
    socket.emit("connected", sessionStorage.getItem("username"));
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("activeUsers", (data) => {
      if (data.username == sessionStorage.getItem("username")) {
        toast.success(`You have joined `, {
          duration: 3000,
        });
      } else {
        toast.success(`${data.username} has joined `, {
          duration: 3000,
        });
      }
      setActiveUsers(data.users);
    });

    socket.on("leftUser", (data) => {
      toast(`${data.user.username} has left `, {
        icon: "️💨",
        duration: 3000,
      });
      setActiveUsers(data.users);
    });

    socket.on("getCreatedUsers", (data) => {
      toast.success(`New user added `, {
        duration: 3000,
      });
      setCreatedUsers(data);
    });

    socket.on("error", (data) => {
      toast.error(data);
    });

    socket.on("refresh", (data) => {
      setCreatedUsers(data);
    });
    return () => {
      socket.off("refresh");
      socket.off("error");
      socket.off("activeUsers");
      socket.off("leftUser");
      socket.off("getCreatedUsers");
    };
  }, [socket]);
  return (
    <>
      <Toaster />

      <div className="activeUsers">
        <h1>Active Users</h1>
        <div className="activeUsers-users">
          {activeUsers.map((el) => (
            <NameInitialsAvatar key={el.socketId} name={el.username} />
          ))}
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
              <div ref={oldInput} className="users-credentials">
                <p>{el.username}</p>
                <p>{el.email}</p>
              </div>
              {el.createdBy == inputs.createdBy ? (
                <div>
                  <button onClick={() => handleDelete(el.username)}>
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => setShowChange(true)}
                  >
                    Update
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Create user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="John123"
                name="username"
                autoFocus
                value={inputs.username}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChange}>
        <Modal.Header>
          <Modal.Title>Create user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="John123"
                name="username"
                autoFocus
                ref={newInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChange(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
