const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    id: { type: Number, required: true },
    technologies: { type: Array },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("PROJECTS", projectSchema);
module.exports = projectModel;
