import { getList, replaceList } from "../reducers/Explore";
import axios from "axios";

const getListHelper = async (dispatch, replace) => {
  const res = await axios.get(
    `http://localhost:3420/api/job/view_all`
  );

  res.data.result.forEach((element) => {
    dispatch(getList(element));
  });

  if (replace !== false) {
    res.data.result.forEach((element) => {
      dispatch(replaceList(element));
    });
  }

  return res;
};

export { getListHelper };
