import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { Image } from "react-bootstrap";
import { useCurrentProfile } from "../../contexts/CurrentProfileContext";
import Profile from "./Profile";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = () => {

    const {id} = useParams();
  const currentUser = useCurrentUser();

  const [profile, setProfile] = useState([])

//   const [profile, setProfile] = useState({
//     id: null,
//     OwnerUsername: "",
//     Created_at: "",
//     ProfileImage: "",
//     Name: "",
//     is_owner: false,
//   });

  useEffect(() => {
    const getProfile = async () => {
      try {
          const { data } = await axiosReq.get(`/profiles/${id}`);
          setProfile(
            [data]
          );
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [currentUser, currentUser?.profile_id, id]);

  return (
    <div>
      {profile.length > 0 ? (
        profile.map(p => (
            <Profile key={p.id} {...p}/>
        ))
        ) : (<p>Nothing</p>)}
        
    </div>
  );
};

export default ProfilePage;
