import React from "react";
import { useState, useEffect } from "react";
import "./Main.css";
import ApiPostRequast from "./ApiPostRequast";
import SearchPosts from "./SearchPosts";
import User from "./User";
import RegisterUser from "./RegisterUser";

const Users = ({ backgroundColor, getAllUsers }) => {
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:9000/users";

  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUrlImage, setNewUrlImage] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newAddress, setNewAddress] = useState();
  const [newCity, setNewCity] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newZipcode, setNewZipcode] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const usersList = await response.json();
        setUsers(usersList);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchUsers())();
    }, 2000);
  }, []);

  const registerUser = async (
    newName,
    newUserName,
    newPassword,
    newGender,
    newEmail,

    newCity,
    newStreet,
    newZipcode,
    newPhone,
    newUrlImage
  ) => {
    const Id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = {
      id: Id,
      name: newName,
      username: newUserName,
      password: newPassword,
      email: newEmail,
      gender: newGender,
      address: {
        city: newCity,
        street: newStreet,
        zipcode: newZipcode,
      },

      phone: newPhone,
      urlImage: newUrlImage,
    };
    const usersList = [...users, newUser];
    setUsers(usersList);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    };
    const result = await ApiPostRequast(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(
      newName,
      newUserName,
      newPassword,
      newGender,
      newEmail,

      newCity,
      newStreet,
      newZipcode,
      newPhone,
      newUrlImage
    );
  };

  const handleDeleteUser = async (id) => {
    const usersList = users.filter((user) => user.id !== id);
    setUsers(usersList);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiPostRequast(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const filterList = users.filter((user) =>
    user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div>
      <p className="main-title">All Users List</p>
      <p className="main-title-number" style={{ color: backgroundColor }}>
        {filterList.length}
      </p>
      <SearchPosts search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading users...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <User
            users={filterList}
            registerUser={registerUser}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </main>

      <RegisterUser
        newName={newName}
        setNewName={setNewName}
        newUserName={newUserName}
        setNewUserName={setNewUserName}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        newGender={newGender}
        setNewGender={setNewGender}
        newUrlImage={newUrlImage}
        setNewUrlImage={setNewUrlImage}
        newCity={newCity}
        setNewCity={setNewCity}
        newStreet={newStreet}
        setNewStreet={setNewStreet}
        newZipcode={newZipcode}
        setNewZipcode={setNewZipcode}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Users;
