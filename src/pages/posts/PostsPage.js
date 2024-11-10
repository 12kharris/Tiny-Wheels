import React, { useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Post from "./Post";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../styles/PostPage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (currentTag == "") {
          const { data } = await axiosRes.get(`/posts/?search=${searchTerm}`);
          setPosts(data);
        } else {
          const { data } = await axiosRes.get(
            `/posts/?Profile__User__username=&Profile__FollowedProfile__FollowingProfile=&Tag=${currentTag}`
          );
          setPosts(data);
        }
      } catch (err) {}
    };
    // dont want to send a query every time we make a key stroke. Wait 1 second to do so
    const time = setTimeout(() => {
      fetchPosts();
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [searchTerm, currentTag, currentUser]);

  const getTags = async () => {
    try {
      const { data } = await axiosReq.get("/tags/");
      setTags(data);
    } catch (err) {}
  };

  return (
    <Row>
      <Col xs={1}></Col>
      <Col md={1} lg={2}>
        <div className={styles.tagsholder}>
          <h4>Filter by tag</h4>
          <hr></hr>
          <div style={{ textAlign: "left" }}>
            <ul>
              {tags?.map(
                (tag) =>
                  tag.TagName != "No tag" && (
                    <li key={tag.id} className={styles.tag}>
                      <span
                        onClick={() => {
                          currentTag == tag.id
                            ? setCurrentTag("")
                            : setCurrentTag(tag.id);
                          setSearchTerm("");
                        }}
                        className={styles.tagitem}
                        style={{
                          backgroundColor:
                            currentTag == tag.id ? `${tag.Colour}` : "",
                        }}
                      >
                        {tag.TagName}
                      </span>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </Col>
      <Col className={styles.posts}>
        <Form>
          <Form.Control
            disabled={currentTag != ""}
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
            <Post
              key={post.id}
              {...post}
              setPosts={setPosts}
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

export default PostsPage;
