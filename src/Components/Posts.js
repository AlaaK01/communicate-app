import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Posts = ({ posts, handleDeletePost, handleAddToFavorite, users }) => {
  return (
    <div>
      {posts.length ? (
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-title">
                <p className="title-text">{post.title}</p>
              </div>
              <div className="post-body">
                <p className="post-text">{post.body}</p>
              </div>

              <div className="post-details">
                <div className="user-name">
                  <p className="title-text">{users[post.userId - 1].name}</p>
                </div>
                <div className="post-body-image">
                  <img
                    src={users[post.userId - 1].urlImage}
                    className="user-image"
                  />
                </div>
              </div>
              <div className="post-button">
                <button
                  className="add-to-favorite"
                  onClick={() => handleAddToFavorite(post.id)}
                >
                  Add Favorite
                </button>
                <FaTrashAlt
                  onClick={() => handleDeletePost(post.id)}
                  role="button"
                  tabIndex="0"
                  aria-label={`Delete ${post.item}`}
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

export default Posts;
