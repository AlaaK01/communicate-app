import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./User.css";

const User = ({ users, registerUser, handleDeleteUser }) => {
  return (
    <div className="user-continer">
      {users.length ? (
        <div className="users">
          {users.map((user) => (
            <div className="user" key={user.id}>
              <div className="name-body">
                <p className="name-text">{user.name}</p>
              </div>
              <div className="image-body">
                <img src={user.urlImage} className="user-image" />
              </div>
              <div className="email-body">
                <p className="email-text">Email: {user.email}</p>
              </div>
              <div className="city-body">
                <p className="city-text">City: {user.address.city}</p>
              </div>
              <div className="phone-body">
                <p className="phone-text">Tel: {user.phone}</p>
              </div>

              <div className="post-details">
                <button
                  className="update"
                  onClick={() => registerUser(user.id)}
                >
                  Edit
                </button>
                <FaTrashAlt
                  onClick={() => handleDeleteUser(User.id)}
                  role="button"
                  tabIndex="0"
                  aria-label={`Delete ${User.item}`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "2rem", color: "red" }}>
          Your List Items is empty
        </p>
      )}
    </div>
  );
};

export default User;
