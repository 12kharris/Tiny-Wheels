import React, { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "../../styles/AddPost.module.css";
import NotExists from "../../components/NotExists";

const AddPost = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [postFormData, setPostFormData] = useState({
    Title: "",
    Caption: "",
    Image: "",
    Tag: null,
  });
  const { title, caption, image } = postFormData;
  const imageInput = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await axiosReq.get("/tags/");
        setTags(data);
        setPostFormData({
          ...postFormData,
          Tag: data[0].id,
        });
      } catch (err) {}
    };
    getTags();
  }, [currentUser]);

  const handleChange = (event) => {
    setPostFormData({
      ...postFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // store the image in the browser local storage
      // Adapted from Code Institute Moments walkthrough
      URL.revokeObjectURL(image);
      setPostFormData({
        ...postFormData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Title", postFormData.Title);
    formData.append("Caption", postFormData.Caption);
    formData.append("Image", imageInput.current.files[0]);
    formData.append("Tag", postFormData.Tag);

    try {
      await axiosReq.post("/posts/", formData);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return currentUser ? (
    <Row style={{ width: "100%" }}>
      <Col md={1} lg={2}></Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="Title"
              id="Title"
              value={title}
              onChange={handleChange}
            ></Form.Control>
            {errors.Title?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              name="Caption"
              id="Caption"
              value={caption}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            {image ? (
              <div>
                <p>
                  <Form.Label htmlFor="image-upload">Change Image</Form.Label>
                </p>
                <Image src={image} className={styles.img} alt="image" />
              </div>
            ) : (
              <Form.Label htmlFor="image-upload">Upload an image</Form.Label>
            )}
            <Form.File
              id="image-upload"
              accept="image/*"
              name="Image"
              ref={imageInput}
              onChange={handleChangeImage}
            ></Form.File>
            {errors.Image?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                Please provide a valid image (height and width less than 4096
                px)
              </Alert>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Tag</Form.Label>
            <Form.Control as="select" onChange={handleChange} name="Tag">
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.TagName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  ) : (
    <NotExists />
  );
};

export default AddPost;
