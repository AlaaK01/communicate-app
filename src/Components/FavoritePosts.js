import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const FavoritePosts = ({
  favoritePosts,
  handleDeletePost,
  backgroundColor,
  handleAddToSeeMoreDetails,
  users,
}) => {
  return (
    <div>
      <p className="main-title">All Posts List</p>
      <p className="main-title-number" style={{ color: backgroundColor }}>
        {favoritePosts.length}
      </p>
      {favoritePosts.length ? (
        <div className="posts">
          {favoritePosts.map((post) => (
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
                  onClick={() => handleAddToSeeMoreDetails(post.id)}
                >
                  More Details
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

export default FavoritePosts;
