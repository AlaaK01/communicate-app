import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import FavoritePosts from "./Components/FavoritePosts";
import Comments from "./Components/Comments";
import Users from "./Components/Users";
import About from "./Components/About";

function App() {
  const [fontColor, setFontColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:9000/users";

  const addToFavorite = (postToAdd) => {
    if (favoritePosts.find((post) => post.id === postToAdd.id)) return;
    const listPosts = [...favoritePosts, postToAdd];
    setFavoritePosts(listPosts);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const usersList = await response.json();
        setUsers(usersList);
      } catch (err) {}
    };
    setTimeout(() => {
      (async () => await fetchUsers())();
    }, 2000);
  }, []);

  const getAllUsers = (userToAdd) => {
    const listUsers = [...users, userToAdd];

    setUsers(listUsers);
  };

  return (
    <Router>
      <Header fontColor={fontColor} backgroundColor={backgroundColor} />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              backgroundColor={backgroundColor}
              addToFavorite={addToFavorite}
              users={users}
            />
          }
        />

        <Route
          path="/myFavorite"
          element={
            <FavoritePosts
              favoritePosts={favoritePosts}
              backgroundColor={backgroundColor}
              // handleAddToSeeMoreDetails={handleAddToSeeMoreDetails}
              users={users}
            />
          }
        />
        <Route
          path="/comments"
          element={<Comments backgroundColor={backgroundColor} />}
        />
        <Route
          path="/users"
          element={
            <Users
              backgroundColor={backgroundColor}
              getAllUsers={getAllUsers}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer
        fontColor={fontColor}
        backgroundColor={backgroundColor}
        setFontColor={setFontColor}
        setBackgroundColor={setBackgroundColor}
      />
    </Router>
  );
}

export default App;
