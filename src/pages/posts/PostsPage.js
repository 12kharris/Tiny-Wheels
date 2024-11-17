import React, { useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Post from "./Post";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import styles from "../../styles/PostPage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostsLoaded(false);
        if (currentTag == "") {
          const { data } = await axiosRes.get(`/posts/?search=${searchTerm}`);
          setPosts(data);
        } else {
          const { data } = await axiosRes.get(
            `/posts/?Profile__User__username=&Profile__FollowedProfile__FollowingProfile=&Tag=${currentTag}`
          );
          setPosts(data);
        }
        setPostsLoaded(true);
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
      setTagsLoaded(false);
      const { data } = await axiosReq.get("/tags/");
      setTags(data);
      setTagsLoaded(true);
    } catch (err) {}
  };

  return (
    <Row>
      <Col xs={1}></Col>
      <Col md={0} lg={2}>
        <div className={styles.tagsholder}>
          <h4>Filter by tag</h4>
          <hr></hr>
          {tagsLoaded ? (
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
          ) : (
            <Spinner animation="border" variant="light" />
          )}
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

        <div className={styles.tagsholdersm}>
          <h4>Filter by tag</h4>
          {tagsLoaded ? (
            <div style={{ textAlign: "center" }}>
              <Row>
                {tags?.map(
                  (tag) =>
                    tag.TagName != "No tag" && (
                      <Col key={tag.id} className={styles.tag}>
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
                      </Col>
                    )
                )}
              </Row>
            </div>
          ) : (
            <Spinner animation="border" variant="light" />
          )}
        </div>
        {postsLoaded ? (
          posts?.length > 0 ? (
            posts.map((post) => (
              <Post key={post.id} {...post} setPosts={setPosts} />
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

export default PostsPage;
