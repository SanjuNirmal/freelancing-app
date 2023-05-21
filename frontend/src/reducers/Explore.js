import { createSlice } from "@reduxjs/toolkit";

export const exploreSlice = createSlice({
  name: "login",
  initialState: {
    jobList: [],
    jobID: "",
    jobProfile: {},
    room: [],
    postedName: "",
    favList: [],
    jobDone: [],
    user: {
      userName: "",
      name: "",
      description: "",
    },
    jobListByTheUser: [{}],
    shopItems: [],
    shopItemsLeft: [],
    shopItemsMiddle: [],
    shopItemsRight: [],
    shopItemProfile: {},
    shopIndex: "",
  },
  reducers: {
    getList: (state, action) => {
      state.jobList = [...state.jobList, action.payload];
    },
    setID: (state, action) => {
      state.jobID = action.payload;
    },
    setJobProfile: (state, action) => {
      state.jobProfile = action.payload;
    },
    setJobRoom: (state, action) => {
      state.room = action.payload;
    },
    setPostedName: (state, action) => {
      state.postedName = action.postedName;
    },
    setFavList: (state, action) => {
      state.favList = [...state.favList, action.payload];
    },
    removeFavList: (state, action) => {
      state.favList.filter((element) => element.id !== action.payload.id);
    },
    addJobDone: (state, action) => {
      state.jobList.filter((element) => element.id !== action.payload.id);
      state.jobDone = [...state.jobDone, action.payload];
    },
    replaceList: (state, action) => {
      state.jobList = action.payload;
    },
    atLoginSetUser: (state, action) => {
      state.user.userName = action.payload.userName;
      state.user.name = action.payload.name;
      state.user.description = action.payload.description;
    },
    setJobListByTheUser: (state, action) => {
      state.jobListByTheUser = action.payload;
    },
    editNameFunction: (state, action) => {
      state.user.name = action.payload;
    },
    editDescriptionFunction: (state, action) => {
      state.user.description = action.payload;
    },
    getShopList: (state, action) => {
      state.shopItems = [...state.shopItems, action.payload];

      if (state.shopIndex === "") {
        state.shopItemsLeft = [...state.shopItemsLeft, action.payload];
        state.shopIndex = "middle";
      } else {
        if (state.shopIndex === "middle") {
          state.shopItemsMiddle = [...state.shopItemsMiddle, action.payload];
          state.shopIndex = "right";
        } else {
          if (state.shopIndex === "right") {
            state.shopItemsRight = [...state.shopItemsRight, action.payload];
            state.shopIndex = "";
          }
        }
      }
    },
    setShopItem: (state, action) => {
      state.shopItemProfile = action.payload;
    },
  },
});

export const {
  getList,
  setID,
  setJobProfile,
  setJobRoom,
  setPostedName,
  setFavList,
  removeFavList,
  removeDataList,
  addJobDone,
  replaceList,
  atLoginSetUser,
  setJobListByTheUser,
  editNameFunction,
  editDescriptionFunction,
  getShopList,
  setShopItem,
} = exploreSlice.actions;
export default exploreSlice.reducer;
