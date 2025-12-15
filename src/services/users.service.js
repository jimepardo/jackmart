import * as model from "../models/User.js";

export const createUser = (username, passwordHash) => {
    return model.createUser(username, passwordHash);
};

export const findUserByUsername = (username) => {
    return model.findUserByUsername(username);
};

export default {
    createUser,
    findUserByUsername
};