import React, { useEffect, useState } from "react";
import { Button, Form, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProfilePreview from "../profiles/ProfilePreview";
import { OptionsDropdown } from "../../components/OptionsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const {
    id,
    Post,
    OwnerProfile,
    OwnerProfileID,
    ProfileImage,
    Username,
    is_owner,
    Created_ago,
    Content,
    getComments,
  } = props;

  const currentUser = useCurrentUser();
  const history = useHistory();

  const [edit, setEdit] = useState(false);
  const [commentData, setCommentData] = useState({
    Post: Post,
    Content: Content,
  });

  useEffect(() => {
    const getCommentData = async () => {
      if (!edit) {
        try {
          const { data } = await axiosRes.get(`/comments/${id}/`);
          setCommentData({
            Post: data.Post,
            Content: data.Content,
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    getCommentData();
  }, [edit]);

  const handleChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Post", Post);
    formData.append("Content", commentData.Content);

    try {
      await axiosReq
        .put(`/comments/${id}`, formData)
        .then(() => {
          setEdit(false);
        })
    } catch (err) {
      console.log(err.response?.data);
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/comments/${id}`).then(() => {getComments()})
    }
    catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Media>
      <Link to={`profiles/${OwnerProfileID}`}>
        <ProfilePreview
          imageURL={ProfileImage}
          text={OwnerProfile?.Length > 0 ? OwnerProfile : Username}
        />
      </Link>
      <span>{Created_ago}</span>

      {edit ? (
        <Media.Body>
          {/* Make this an INLINE form */}
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              name="Post"
              value={Post}
              hidden
              readOnly
            ></Form.Control>
            <Form.Control
              type="text"
              name="Content"
              value={commentData.Content}
              onChange={handleChange}
            ></Form.Control>
            <Button type="submit">Save</Button>
          </Form>

          <OptionsDropdown
            handleEdit={() => {
              setEdit(!edit);
            }}
            handleDelete={handleDelete}
          />
        </Media.Body>
      ) : (
        <Media.Body>
          <p>{commentData.Content}</p>
          {currentUser?.username == Username && (
            <OptionsDropdown
              handleEdit={() => {
                setEdit(!edit);
              }}
              handleDelete={handleDelete}
            />
          )}
        </Media.Body>
      )}
    </Media>
  );
};

export default Comment;
