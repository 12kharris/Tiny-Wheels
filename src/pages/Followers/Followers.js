import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ProfilePreview from "../profiles/ProfilePreview";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NotExists from "../../components/NotExists";

const Followers = (props) => {
  const { following } = props;
  const { id } = useParams();
  const [profiles, setProfiles] = useState([]);
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    fetchProfileList();
  }, [id, following, currentUser]);

  const fetchProfileList = async () => {
    try {
      if (id) {
        if (following) {
          const { data } = await axiosReq.get(
            `/followers/?FollowingProfile__User=${id}&FollowedProfile__id=`
          );
          setProfiles(data);
        } else {
          const { data } = await axiosReq.get(
            `/followers/?FollowingProfile__User=&FollowedProfile__id=${id}`
          );
          setProfiles(data);
        }
      }
    } catch (err) {}
  };

  return currentUser ? (
    <Row>
      <Col xs={2}>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </Button>
      </Col>
      <Col>
        {following ? <h3>Following</h3> : <h3>Followers</h3>}
        {profiles.length > 0 ? (
          profiles?.map((p) =>
            following ? (
              <Link to={`/profiles/${p.FollowedProfile}`}>
                <ProfilePreview
                  imageURL={p.FollowedProfileImage}
                  text={
                    p.FollowedProfileName.Length > 0
                      ? p.FollowedProfileName
                      : p.FollowedUser
                  }
                  height={50}
                />
              </Link>
            ) : (
              <Link to={`/profiles/${p.FollowingProfileID}`}>
                <ProfilePreview
                  imageURL={p.FollowingProfileImage}
                  text={
                    p.FollowingProfileName.Length > 0
                      ? p.FollowingProfileName
                      : p.FollowingUser
                  }
                  height={50}
                />
              </Link>
            )
          )
        ) : following ? (
          <h4>User is not following any profiles</h4>
        ) : (
          <h4>No users follow this profile</h4>
        )}
      </Col>

      <Col xs={2}></Col>
    </Row>
  ) : (
    <NotExists />
  );
};

export default Followers;
