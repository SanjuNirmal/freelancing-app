const mongoose = require("mongoose");

const jobRoomSchema = mongoose.Schema(
  {
    postedUser: {
      type: String,
      required: true,
    },
    jobRoomArray: [{ type: String }],
  },
  { collection: "JobRoom" }
);

module.exports = mongoose.model("JobRoom", jobRoomSchema);
