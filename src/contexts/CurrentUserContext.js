import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

//import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children /*  our components are rendered where in place of children */}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}