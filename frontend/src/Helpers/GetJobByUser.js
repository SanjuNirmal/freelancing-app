import { setJobListByTheUser } from "../reducers/Explore";
import axios from "axios";

const getJLByUserHelper = async (dispatch, email) => {
  //   console.log("getUserCall", email);

  let data = {
    userName: email,
  };

  const res = await axios.post(
    `http://localhost:3420/api/job/view_by_user`,
    data
  );

  console.log(res);

  if (res.data.result !== null) {
    dispatch(setJobListByTheUser(res.data.result));
  } else {
    console.log("There are no values in the database");
  }

//   console.log(res);

  return res;
};

export { getJLByUserHelper };
