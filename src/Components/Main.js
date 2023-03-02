import React from "react";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";
import "./Main.css";
import SearchPosts from "./SearchPosts";
import ApiPostRequast from "./ApiPostRequast";
import Aside from "./Aside";

const Main = ({ backgroundColor, addToFavorite, users }) => {
  const API_URL = "http://localhost:3500/posts";
  const [posts, setPosts] = useState(
    []
    // JSON.parse(localStorage.getItem("postsList")) || []
  );

  const [newUserId, setNewUserId] = useState();
  const [newTtitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const postsList = await response.json();
        setPosts(postsList);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchPosts())();
    }, 2000);
  }, []);

  const addPost = async (newUserId, newTitle, newBody) => {
    const Id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
      id: Id,
      userId: newUserId,
      title: newTitle,
      body: newBody,
    };
    const postsList = [...posts, newPost];
    setPosts(postsList);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPost),
    };
    const result = await ApiPostRequast(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(newUserId, newTtitle, newBody);
  };

  const handleDeletePost = async (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiPostRequast(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const filterList = posts.filter((post) =>
    post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const handleAddToFavorite = (_id) => {
    // if (favoritePosts.find((post) => post.id === _id)) return;
    const findPost = posts.find((post) => post.id === _id);
    // const listPosts = [...favoritePosts, findPost];
    // setFavoritePosts(listPosts);
    addToFavorite(findPost);
  };

  return (
    <main>
      <Aside />
      <p className="main-title">All Posts List</p>
      <p className="main-title-number" style={{ color: backgroundColor }}>
        {filterList.length}
      </p>
      <SearchPosts search={search} setSearch={setSearch} />
      <div>
        {isLoading && <p>Loading Posts...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Posts
            posts={filterList}
            handleDeletePost={handleDeletePost}
            handleAddToFavorite={handleAddToFavorite}
            users={users}
          />
        )}
      </div>
      <AddPost
        newUserId={newUserId}
        newTitle={newTtitle}
        newBody={newBody}
        setNewUserId={setNewUserId}
        setNewTitle={setNewTitle}
        setNewBody={setNewBody}
        handleSubmit={handleSubmit}
      />
    </main>
  );
};

export default Main;
