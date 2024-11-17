import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Col, Row, Spinner } from "react-bootstrap";
import Profile from "./Profile";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [profile, setProfile] = useState({});
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setProfileLoaded(false);
        const { data } = await axiosReq.get(`/profiles/${id}`);
        setProfile(data);
        setProfileLoaded(true);
      } catch (err) {}
    };
    getProfile();
  }, [currentUser, currentUser?.profile_id, id]);

  return (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        {profileLoaded ? (
          profile && <Profile {...profile} />
        ) : (
          <Spinner animation="border" variant="light" />
        )}
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  );
};

export default ProfilePage;
