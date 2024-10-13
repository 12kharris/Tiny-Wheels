import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Col, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/PostPage.module.css";

const Popular = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
        const { data } = await axiosReq.get("/posts/?ordering=-Likes_count");
        setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  },[]);

  return (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col className={styles.posts}>
        {posts?.length > 0 ? (
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
        )}
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  );
};

export default Popular;
