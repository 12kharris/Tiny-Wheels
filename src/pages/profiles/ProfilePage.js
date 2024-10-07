import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults';
import { Image } from 'react-bootstrap';

const ProfilePage = () => {
    const currentUser = useCurrentUser();
    const [profile, setProfile] = useState({
        id: "", Owner: "", Created_at: "", Image: "", Name: "", is_owner: false
    });
    
    useEffect(() => {
        const getProfile = async () => {
            try {
                const {data} = await axiosReq.get(`/profiles/${currentUser?.profile_id}`);
                console.log(data);
                console.log(data.id);
                setProfile(
                    {
                        ...profile,
                        id: data.id,
                        Owner: data.owner,
                        Created_at: data.Created_at,
                        Image: data.Image,
                        Name: data.Name,
                        is_owner: data.is_owner
                    }
                );
                console.log(profile);
            }
            catch (err) {
                console.log(err);
            }
        }
        getProfile();
    },[currentUser, currentUser?.profile_id]);


  return (
    <div>
        {profile.id ? (
            <>  
                <Image src={profile.Image} />
                {currentUser?.username}
                {profile.Name}
            </>
        ) : (
            <div>nothing</div>
        )}
        
    </div>
  )
}

export default ProfilePage