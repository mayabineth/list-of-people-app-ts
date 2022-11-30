import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  genderProbability: {
    type: String,
  },
  nationality: {
    type: String,
  },
  nationalityProbability: {
    type: String,
  },
});

export default mongoose.model("Person", PersonSchema);
