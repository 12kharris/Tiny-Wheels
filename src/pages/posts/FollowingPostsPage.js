import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import Post from "./Post";
import { Col, Row } from "react-bootstrap";
import NotExists from "../../components/NotExists";

const FollowingPostsPage = () => {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFollowedPosts = async () => {
      try {
        if (currentUser) {
          console.log(`current user: ${currentUser.profile_id}`);
          const { data } = await axiosRes.get(
            `/posts/?Profile__FollowedProfile__FollowingProfile=${currentUser?.profile_id}`
          );
          console.log(data);
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFollowedPosts();
  }, [currentUser]);

  return (
    currentUser ? (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        {posts?.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} {...post} />
          ))
        ) : (
          <p>No Results</p>
        )}
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
    ) : (
      <NotExists />
    )
  );
};

export default FollowingPostsPage;
