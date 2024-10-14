import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Post from "../posts/Post";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import styles from "../../styles/Profile.module.css";

export function Profile(props) {
  const {
    //id,
    OwnerUser,
    OwnerUsername,
    Created_at,
    ProfileImage,
    Name,
    is_owner,
    is_followed,
    collection_id,
  } = props;

  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [followed, setFollowed] = useState([]);
  const history = useHistory();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchFollowed();
  }, [currentUser, id, history, OwnerUsername, OwnerUser]);

  const fetchPosts = async () => {
    try {
      if (OwnerUsername) {
        const { data } = await axiosReq.get(
          `/posts/?Profile__User__username=${OwnerUsername}&Profile__FollowedProfile__FollowingProfile=`
        );
        setPosts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowed = async () => {
    try {
      if (currentUser) {
        const { data } = await axiosReq.get(
          `/followers/?FollowingProfile__User=${currentUser.pk}&FollowedProfile__id=${id}`
        );
        setFollowed(data);
      }
      if (OwnerUser) {
        const { data } = await axiosReq.get(
          `/followers/?FollowingProfile__User=${OwnerUser}&FollowedProfile__id=`
        );
        setFollowing(data);
      }
      if (id) {
        const { data } = await axiosReq.get(
          `/followers/?FollowingProfile__User=&FollowedProfile__id=${id}`
        );
        setFollowers(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      await axiosRes
        .post("/followers/", {
          FollowingProfile: currentUser.profile_id,
          FollowedProfile: id,
        })
        .then(() => {
          fetchFollowed();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnFollow = async () => {
    try {
      await axiosRes.delete(`/followers/${followed[0].id}`).then(() => {
        fetchFollowed();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <div className={styles.img_holder}>
            <Image src={ProfileImage} className={styles.img} rounded />
          </div>
        </Col>

        <Col className={styles.contentholder}>
          <p>
            <strong style={{ fontSize: "25px" }}>{OwnerUsername}</strong>
          </p>
          <p>{Name}</p>
          <p>Joined: {Created_at}</p>
          <p>
            <Link to={`/collection/${collection_id}`}>See collection</Link>
          </p>
          {currentUser && followed.length > 0 ? (
            <Button variant="danger" onClick={handleUnFollow}>
              Unfollow
            </Button>
          ) : currentUser && !is_owner ? (
            <Button variant="primary" onClick={handleFollow}>
              Follow
            </Button>
          ) : is_owner ? (
            <Link to={`/profiles/${id}/edit`}>
              <Button>Edit</Button>
            </Link>
          ) : (
            <></>
          )}
        </Col>
        <Col>
          <Row>
            <Col>
              <Link className={styles.followlink} to={`/followers/${id}`}>
                Followers
              </Link>
              <p className={styles.count}>{followers.length}</p>
            </Col>
            <Col>
              <Link
                className={styles.followlink}
                to={`/following/${OwnerUser}`}
              >
                Following
              </Link>
              <p className={styles.count}>{following.length}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Container className={styles.postsholder}>
        <p>{OwnerUsername}'s posts</p>
        <hr></hr>
        {posts?.length > 0 ? (
          posts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <p>No posts yet</p>
        )}
      </Container>
    </>
  );
}

export default Profile;
