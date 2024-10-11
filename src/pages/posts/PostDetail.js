import React, { useEffect, useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Post from './Post';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Col, Container } from 'react-bootstrap';
import Comment from '../comments/Comment';

const PostDetail = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getPostData = async () => {
            if (id) {
                try {
                    const {data} = await axiosRes.get(`/posts/${id}/`);
                    setPost(data);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        const getComments = async() => {
            if (id) {
                try {
                    const {data} = await axiosRes.get(`/comments/?Post=${id}`);
                    setComments(data.results);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        getPostData();
        getComments();
    },[id]);

  return (
    <Col>
        <Post {...post} />
        <Container>
            {comments.length > 0 ? (
                comments.map(c => (
                    <Comment key={c.id} {...c}/>
                ))
            ) : (
                <p>No Comments</p>
            )}
        </Container>
    </Col>
  )
}

export default PostDetail