import { TUserDocument } from "../types";

const saveUser = async (user: TUserDocument) => {
  await user.save();
};

export default saveUser;
