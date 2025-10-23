import { Document } from "mongoose";

export type TUser = {
  name: string;
  email: string;
};

export type TUserPartial = Partial<TUser>;

export type TUserDocument = Document & TUser;
