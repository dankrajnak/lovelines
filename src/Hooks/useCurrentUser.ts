import axios from "axios";
import useSwr from "swr";
import { CurrentUserReturnType } from "../pages/api/person/currentUser";
import { responseInterface } from "swr";

const getCurrentUser = (): Promise<CurrentUserReturnType> =>
  axios.get("/api/person/currentUser").then((resp) => resp.data);

const useCurrentUser = (): responseInterface<CurrentUserReturnType, any> =>
  useSwr("/api/person/currentUser", getCurrentUser, {
    revalidateOnFocus: false,
  });

export default useCurrentUser;
