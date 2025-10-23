"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saveUser = async (user) => {
    await user.save();
};
exports.default = saveUser;
