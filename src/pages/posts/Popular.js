import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Col, Row, Spinner } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/PostPage.module.css";

const Popular = () => {
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const fetchPosts = async () => {
    try {
      setPostsLoaded(false);
      const { data } = await axiosReq.get("/posts/?ordering=-Likes_count");
      setPosts(data);
      setPostsLoaded(true);
    } catch (err) {}
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col className={styles.posts}>
        {postsLoaded ? (
          posts?.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                {...post}
                setPosts={setPosts}
                showComments={false}
              />
            ))
          ) : (
            <p>No Results</p>
          )
        ) : (
          <Spinner animation="border" variant="light" />
        )}
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  );
};

export default Popular;
