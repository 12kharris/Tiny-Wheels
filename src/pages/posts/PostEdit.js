import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Form, Image } from "react-bootstrap";

const PostEdit = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const { id } = useParams();
  const [postData, setPostData] = useState({
    Title: "",
    Caption: "",
    image: "",
    Tag: "",
    TagName: "",
    TagColour: "",
  });
  const {Title, Caption, Tag, TagName, TagColour} = postData;
  var image = postData.Image;
  const [tags, setTags] = useState([]);
  const imageInput = useRef(null);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // store the image in the browser local storage
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        Image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Title", postData.Title);
    formData.append("Caption", postData.Caption);
    if (imageInput?.current?.files[0]) {
        formData.append("Image", imageInput.current.files[0]);
      }
    formData.append("Tag", postData.Tag);
    
    try {
        await axiosReq.put(`/posts/${id}/`, formData);
        history.push(`/posts/${id}`);
    }
    catch (err) {
        console.log(err.response.data);
    }
  }

  useEffect(() => {
    const getPostData = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        setPostData({
            Title: data.Title,
            Caption: data.Caption,
            Image: data.Image,
            Tag: data.Tag,
            TagName: data.TagName,
            TagColour: data.TagColour
        });
      } catch (err) {
        console.log(err);
      }
    };
    const getTags = async () => {
      try {
        const { data } = await axiosReq.get("/tags/");
        setTags(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPostData();
    getTags();
  }, [id, currentUser]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="Title"
          id="Title"
          value={Title}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Caption</Form.Label>
        <Form.Control
          type="text"
          name="Caption"
          id="Caption"
          value={Caption}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="image-upload">Change Image</Form.Label>
        <Image src={image} />
        <Form.File
          id="image-upload"
          accept="image/*"
          name="Image"
          ref={imageInput}
          onChange={handleChangeImage}
        ></Form.File>
      </Form.Group>
      <Form.Group>
        <Form.Label>Tag</Form.Label>
        <Form.Control as="select" onChange={handleChange} name="Tag" value={Tag}>
          {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.TagName}</option> 
          ))}
        </Form.Control>
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
    );
};

export default PostEdit;
