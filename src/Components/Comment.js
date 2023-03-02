import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Comment = ({
  comments,
  handleDeleteComment,
  handleAddToReplay,
  users,
}) => {
  return (
    <div>
      {comments.length ? (
        <div className="posts">
          {comments.map((comment) => (
            <div className="post" key={comment.id}>
              <div className="post-title">
                <p className="title-text">{comment.name}</p>
              </div>
              <div className="post-body">
                <p className="post-text">{comment.body}</p>
              </div>

              {/* <div className="post-details">
                <div className="user-name">
                  <p className="title-text">{users[comment.userId - 1].name}</p>
                </div>
                <div className="post-body-image">
                  <img
                    src={users[comment.userId - 1].urlImage}
                    className="user-image"
                  />
                </div>
              </div> */}
              <div className="post-button">
                <button
                  className="add-to-favorite"
                  onClick={() => handleAddToReplay(comment.id)}
                >
                  Replay
                </button>
                <FaTrashAlt
                  onClick={() => handleDeleteComment(comment.id)}
                  role="button"
                  tabIndex="0"
                  aria-label={`Delete ${comment.item}`}
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

export default Comment;
