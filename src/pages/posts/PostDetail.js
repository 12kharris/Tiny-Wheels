import React, { useEffect, useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Post from './Post';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const PostDetail = () => {
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPostData = async () => {
            try {
                const {data} = await axiosRes.get(`/posts/${id}/`);
                setPost(data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getPostData();
    },[]);

  return (
    <Post {...post} />
    // add individual comments here
  )
}

export default PostDetail