import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import Post from "./Post";
import { Col, Row, Spinner } from "react-bootstrap";
import NotExists from "../../components/NotExists";

const FollowingPostsPage = () => {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    const getFollowedPosts = async () => {
      try {
        setPostsLoaded(false);
        if (currentUser) {
          const { data } = await axiosRes.get(
            `/posts/?Profile__FollowedProfile__FollowingProfile=${currentUser?.profile_id}`
          );
          setPosts(data);
        }
        setPostsLoaded(true);
      } catch (err) {}
    };
    getFollowedPosts();
  }, [currentUser]);

  return currentUser ? (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        {postsLoaded ? (
          posts?.length > 0 ? (
            posts.map((post) => <Post key={post.id} {...post} />)
          ) : (
            <p>No Results</p>
          )
        ) : (
          <Spinner animation="border" variant="light" />
        )}
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  ) : (
    <NotExists />
  );
};

export default FollowingPostsPage;
