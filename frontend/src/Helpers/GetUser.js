import { atLoginSetUser } from "../reducers/Explore";
import axios from "axios";

const getUser = async (dispatch, userName) => {
  console.log("getUserCall");
  const res = await axios.get(
    `http://localhost:3420/api/user/view_one`,
    {
      userName,
    }
  );

  dispatch(atLoginSetUser(res.data.result));
  console.log(res);

  return res;
};

export { getUser };
