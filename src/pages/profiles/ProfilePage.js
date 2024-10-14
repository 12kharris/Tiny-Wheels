import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Col, Image, Row } from "react-bootstrap";
import Profile from "./Profile";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [currentUser, currentUser?.profile_id, id]);

  return (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>{profile && <Profile {...profile} />}</Col>
      <Col md={1} lg={2}></Col>
    </Row>
  );
};

export default ProfilePage;
