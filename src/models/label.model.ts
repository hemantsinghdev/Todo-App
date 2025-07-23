import { Schema, Document, Model, models, model } from "mongoose";
import TLabel from "@/types/label";

interface ILabel extends TLabel, Document {}

const LabelSchema = new Schema<ILabel>(
  {
    labelId: {
      type: String,
      required: true,
      trim: true,
    },
    labelName: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
      match: /^#([0-9a-fA-F]{3}){1,2}$/,
    },
  },
  {
    collection: "labels",
  }
);

const LabelModel: Model<ILabel> =
  models.Label || model<ILabel>("Label", LabelSchema);

export default LabelModel;
export type { ILabel };
