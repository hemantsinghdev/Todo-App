import { Schema, Document, Model, models, model } from "mongoose";

interface ILabel extends Document {
  name: string;
  color: string;
}

const LabelSchema = new Schema<ILabel>(
  {
    name: {
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
    timestamps: true,
  }
);

const LabelModel: Model<ILabel> =
  models.Label || model<ILabel>("Label", LabelSchema);

export default LabelModel;
export type { ILabel };
