import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import NotExists from "../../components/NotExists";
import styles from "../../styles/EditProfile.module.css";

const EditProfile = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState({});
  const imageInput = useRef(null);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        setProfile(data);
      } catch (err) {}
    };
    getProfile();
  }, [currentUser, currentUser?.profile_id, id]);

  const handleChange = (event) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // store the image in the browser local storage
      // Adapted from Code Institute Moments walkthrough
      URL.revokeObjectURL(profile.Image);
      setProfile({
        ...profile,
        ProfileImage: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (imageInput?.current?.files[0]) {
      formData.append("ProfileImage", imageInput.current.files[0]);
    }
    formData.append("Name", profile.Name);

    try {
      await axiosReq.put(`/profiles/${id}/`, formData);
      history.push(`/profiles/${id}`);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return profile?.id && profile?.OwnerUsername == currentUser?.username ? (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className={styles.formcontrols}>
              <Form.Group>
                <div>
                  <p>
                    <Form.Label htmlFor="image-upload">Change Image</Form.Label>
                  </p>
                  <Image src={profile?.ProfileImage} className={styles.img} />
                </div>
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  name="ProfileImage"
                  ref={imageInput}
                  onChange={handleChangeImage}
                ></Form.File>
                {errors.ProfileImage?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    Please provide a valid image (height and width less than
                    4096 px)
                  </Alert>
                ))}
              </Form.Group>
            </Col>
            <Col md={8} className={styles.formcontrols}>
              <Form.Group>
                <Row>
                  <Col xs={2}>
                    <Form.Label>Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="Name"
                      id="Name"
                      value={profile.Name}
                      placeholder="Add a name"
                      onChange={handleChange}
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Button
            onClick={() => {
              history.goBack();
            }}
            variant="danger"
            style={{ marginRight: "20px" }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Save
          </Button>
        </Form>
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  ) : (
    <NotExists />
  );
};

export default EditProfile;
