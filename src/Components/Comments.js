import React from "react";
import { useState, useEffect } from "react";
import ApiPostRequast from "./ApiPostRequast";
import SearchPosts from "./SearchPosts";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Comments = ({ backgroundColor, users }) => {
  const API_URL = "http://localhost:3300/comments";
  const [comments, setComments] = useState([]);

  const [newPostId, setNewPostId] = useState();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBody, setNewBody] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const commentsList = await response.json();
        setComments(commentsList);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchComments())();
    }, 2000);
  }, []);

  const addComment = async (newPostId, newName, newEmail, newBody) => {
    const Id = comments.length ? comments[comments.length - 1].id + 1 : 1;
    const newComment = {
      id: Id,
      postId: newPostId,
      name: newName,
      email: newEmail,
      body: newBody,
    };
    const commentsList = [...comments, newComment];
    setComments(commentsList);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newComment),
    };
    const result = await ApiPostRequast(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(newPostId, newName, newEmail, newBody);
  };

  const handleDeleteComment = async (id) => {
    const commentsList = comments.filter((comment) => comment.id !== id);
    setComments(commentsList);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiPostRequast(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const filterList = comments.filter((comment) =>
    comment.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div>
      <p className="main-title">All Comments List</p>
      <p className="main-title-number" style={{ color: backgroundColor }}>
        {filterList.length}
      </p>
      <SearchPosts search={search} setSearch={setSearch} />
      <div>
        {isLoading && <p>Loading Posts...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Comment
            comments={filterList}
            handleDeleteComment={handleDeleteComment}
            // handleAddToReplay={handleAddToReplay}
            users={users}
          />
        )}
      </div>
      <AddComment
        newPostId={newPostId}
        newName={newName}
        newBody={newBody}
        newEmail={newEmail}
        setNewPostId={setNewPostId}
        setNewName={setNewName}
        setNewEmail={setNewEmail}
        setNewBody={setNewBody}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Comments;
