import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Button, Form, Image } from "react-bootstrap";

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

  useEffect(() => {
    getCollectionItem();
    getSeries();
  }, [id]);

  const handleSubmit = async(event) => {
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
        history.push(`/collection/item/${id}`);
    }
    catch (err) {
        console.log(err?.response.data);
    }
}

  return (
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
        <Form.Label htmlFor="image-upload">Change Image</Form.Label>
        <Image src={itemData.Image} />
        <Form.File
          id="image-upload"
          accept="image/*"
          name="Image"
          ref={imageInput}
          onChange={handleChangeImage}
        ></Form.File>
      </Form.Group>
      <Button type="submit" variant="success">
        Save
      </Button>
    </Form>
  );
};

export default EditCollectionItem;
