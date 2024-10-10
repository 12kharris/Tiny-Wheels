import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import Post from "./Post";
import { Form } from "react-bootstrap";

const PostsPage = () => {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosRes.get(`/posts/?search=${searchTerm}`);
        console.log(data);
        setPosts(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    // dont want to send a query every time we make a key stroke. Wait 1 second to do so
    const time = setTimeout(() => {
        fetchPosts();
    }, 1000);
    return () => {
        clearTimeout(time);
    }
  }, [searchTerm]);

  return (
    <div>
      <Form>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></Form.Control>
      </Form>
      {posts?.length > 0 ? (
        posts.map((post) => (
          //make this a Post component
          <Post key={post.id} {...post} setPosts={setPosts} />
        ))
      ) : (
        <p>No Results</p>
      )}
    </div>
  );
};

export default PostsPage;
