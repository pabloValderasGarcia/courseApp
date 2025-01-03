import { Document, ObjectId } from "mongoose";

export type Ref<T extends Document> = ObjectId | T;