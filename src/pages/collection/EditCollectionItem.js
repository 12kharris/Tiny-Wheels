import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/EditCollectionItem.module.css";
import NotExists from "../../components/NotExists";

const EditCollectionItem = () => {
  const { id } = useParams();
  const imageInput = useRef(null);
  const history = useHistory();
  const [itemData, setItemData] = useState({
    id: null,
    Name: "",
    Series: null,
    Quantity: 0,
    Image: "",
    Owner: "",
    is_owner: false,
  });
  const [series, setSeries] = useState([]);
  const [errors, setErrors] = useState({});
  const currentUser = useCurrentUser();

  const getCollectionItem = async () => {
    if (id) {
      try {
        const { data } = await axiosReq.get(`collections/item/${id}/`);
        setItemData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getSeries = async () => {
    try {
      const { data } = await axiosRes.get("/series/");
      setSeries(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // store the image in the browser local storage
      // Adapted from Code Institute Moments walkthrough
      URL.revokeObjectURL(itemData.Image);
      setItemData({
        ...itemData,
        Image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleChange = (event) => {
    setItemData({
      ...itemData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/collections/item/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getCollectionItem();
      getSeries();
    }
  }, [id, currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Name", itemData.Name);
    formData.append("Series", itemData.Series);
    formData.append("Quantity", itemData.Quantity);
    if (imageInput?.current?.files[0]) {
      formData.append("Image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/collections/item/${id}`, formData);
      history.goBack();
    } catch (err) {
      console.log(err?.response.data);
      setErrors(err.response?.data);
    }
  };

  return currentUser && currentUser.username == itemData?.Owner ? (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Model Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              id="Name"
              value={itemData.Name}
              onChange={handleChange}
            ></Form.Control>
            {errors.Name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Series</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              name="Series"
              value={itemData?.Series ? itemData.Series : ""}
            >
              {series?.map((s) => (
                <option
                  key={s.id}
                  value={s.id}
                >{`${s.SeriesName} - ${s.BrandName}`}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="Quantity"
              min={1}
              value={itemData.Quantity}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <div>
              <p>
                <Form.Label htmlFor="image-upload">Change Image</Form.Label>
              </p>
              <Image src={itemData.Image} className={styles.img} />
            </div>

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
          <Button type="submit" variant="success" className={styles.button}>
            Save
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
            className={styles.button}
          >
            Delete
          </Button>
        </Form>
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  ) : (
    <NotExists />
  );
};

export default EditCollectionItem;
