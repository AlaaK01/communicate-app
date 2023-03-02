import React from "react";

import { useRef } from "react";

const AddPost = ({
  newUserId,
  newTitle,
  newBody,
  setNewUserId,
  setNewTitle,
  setNewBody,
  handleSubmit,
}) => {
  const inputRef = useRef();
  return (
    <form onSubmit={handleSubmit}>
      <p className="add-post-title">To Add A New Item...</p>
      <div className="addForm">
        <label htmlFor="addNewUser">Add New User</label>

        <input
          autoFocus
          //   ref={inputRef}
          id="addDescribtion"
          type="text"
          placeholder="Add New User"
          required
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
        />
      </div>
      <div className="addForm">
        <label htmlFor="addTitle">Add Name</label>

        <input
          autoFocus
          //   ref={inputRef}
          id="addTitle"
          type="text"
          placeholder="Add Title"
          required
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className="addForm">
        <label htmlFor="addBody">Add Name</label>

        <input
          autoFocus
          //   ref={inputRef}
          id="addBody"
          type="text"
          placeholder="Add Body"
          required
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
      </div>
      <button
        className="add-to-post"
        type="submit"
        aria-label="Add Post"
        onClick={() => inputRef.current.focus()}
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
