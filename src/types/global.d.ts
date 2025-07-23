import mongoose from "mongoose";

declare global {
  //To Avoid Hot-Reload during development
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}
