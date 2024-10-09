import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

export const CurrentProfileContext = createContext();
export const SetCurrentProfileContext = createContext();

export const useCurrentProfile = () => useContext(CurrentProfileContext);
export const useSetCurrentProfile = () => useContext(SetCurrentProfileContext);

export const CurrentProfileProvider = ({ children }) => {
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState({
    id: "",
    User: "",
    OwnerUsername: "",
    Created_at: "",
    Image: "",
    Name: "",
    is_owner: false,
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        console.log(currentUser);
        const { data } = await axiosReq.get(
          `/profiles/${currentUser.profile_id}`
        );
        // the above is ordered by user id which should always return the desired profile first
        setProfile({
          id: data.id,
          User: data.User,
          OwnerUsername: data.OwnerUsername,
          Created_at: data.Created_at,
          Image: data.Image,
          Name: data.Name,
          is_owner: data.is_owner,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getProfileData();
  }, [currentUser]);

  return (
    <CurrentProfileContext.Provider value={profile}>
      <SetCurrentProfileContext.Provider value={{ setProfile }}>
        {children}
      </SetCurrentProfileContext.Provider>
    </CurrentProfileContext.Provider>
  );
};
