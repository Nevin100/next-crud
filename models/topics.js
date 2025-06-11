import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    requirder: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

export default Topic;
