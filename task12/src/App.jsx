import React, { useState } from "react";

// Post component
function Post({ post, handleLike, handleComment }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20, marginBottom: 20 }}>
      <img src={post.image} alt="Post Image" style={{ width: "100%" }} />
      <h3>Owner: {post.owner}</h3>
      <p>Likes: {post.likes}</p>
      <button onClick={() => handleLike(post.id)}>Like</button>
      <h4>Comments:</h4>
      <ul>
        {post.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a comment..."
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleComment(post.id, e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}

// App component
function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: "https://picsum.photos/200/300",
      owner: "John Doe",
      likes: 10,
      comments: ["Nice post!", "I like it!"],
    },
    {
      id: 2,
      image: "https://picsum.photos/200/301",
      owner: "Jane Doe",
      likes: 20,
      comments: ["Great job!", "Excellent!"],
    },
    {
      id: 3,
      image: "https://picsum.photos/200/302",
      owner: "Bob Smith",
      likes: 5,
      comments: ["Good work!", "Keep it up!"],
    },
    {
      id: 4,
      image: "https://picsum.photos/200/303",
      owner: "Alice Johnson",
      likes: 15,
      comments: ["I love it!", "Well done!"],
    },
  ]);

  const handleLike = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  const handleComment = (id, comment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      })
    );
  };

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          handleLike={handleLike}
          handleComment={handleComment}
        />
      ))}
    </div>
  );
}

export default App;

/* import React, { useState } from "react";

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <img src={post.image} alt="post" width="100%" height="200px" />
      <p>Owner: {post.owner}</p>
      <p>Likes: {likes}</p>
      <button onClick={handleLike}>Like</button>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const posts = [
    {
      id: 1,
      image: "https://picsum.photos/200/300",
      owner: "John Doe",
      likes: 10,
      comments: ["Great post!", "I love it!"],
    },
    {
      id: 2,
      image: "https://picsum.photos/200/301",
      owner: "Jane Doe",
      likes: 5,
      comments: ["Good job!", "Keep going!"],
    },
    {
      id: 3,
      image: "https://picsum.photos/200/302",
      owner: "Alice Smith",
      likes: 20,
      comments: ["Excellent!", "I agree!"],
    },
    {
      id: 4,
      image: "https://picsum.photos/200/303",
      owner: "Bob Johnson",
      likes: 15,
      comments: ["Well done!", "Thanks for sharing!"],
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default App; */
