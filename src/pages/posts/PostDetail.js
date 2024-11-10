import React, { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Post from "./Post";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row } from "react-bootstrap";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPostData = async () => {
      if (id) {
        try {
          const { data } = await axiosRes.get(`/posts/${id}/`);
          setPost(data);
        } catch (err) {}
      }
    };
    getPostData();
  }, [id]);

  return (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        <Post {...post} showComments={true} setPosts={setPost}/>
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  );
};

export default PostDetail;
