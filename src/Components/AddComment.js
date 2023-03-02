import React from "react";
import { useRef } from "react";

const AddComment = ({
  newPostId,
  newName,
  newBody,
  newEmail,
  setNewPostId,
  setNewName,
  setNewEmail,
  setNewBody,
  handleSubmit,
}) => {
  const inputRef = useRef();
  return (
    <form onSubmit={handleSubmit}>
      <p className="add-post-title">To Add A New Comment...</p>
      <div className="addForm">
        <label htmlFor="addNewComment">Add New Comment</label>

        <input
          autoFocus
          //   ref={inputRef}
          id="addPostId"
          type="number"
          placeholder="Add Post Id"
          required
          value={newPostId}
          onChange={(e) => setNewPostId(e.target.value)}
        />
      </div>
      <div className="addForm">
        <label htmlFor="addName">Add Name</label>

        <input
          autoFocus
          //   ref={inputRef}
          id="addName"
          type="text"
          placeholder="Add Name"
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="addForm">
        <label htmlFor="addEmail">Add Email</label>

        <input
          autoFocus
          //   ref={inputRef}
          id="addEmail"
          type="text"
          placeholder="Add Email"
          required
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
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

export default AddComment;
