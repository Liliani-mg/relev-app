const { ErrorObject } = require("../helpers/error");
const { User } = require("../database/models");

exports.findAll = async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500);
    }
  };

  exports.getUser = async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new ErrorObject("User not found", 404);
      return user;
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500);
    }
  };

  module.exports.createUser = async (user) => {
    try {
      const email = user.email;
      const find = await User.findOne({ where: { email } });
      if (find) {
        throw new ErrorObject("email is already exists", 400);
      }
      await User.create(user);
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500);
    }
  };

  exports.editUser = async (id, props) => {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new ErrorObject("User not found", 404);
      const result = await User.update(props, { where: { id } });
      return result;
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500);
    }
  };

  
  exports.getByEmail = async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new ErrorObject("User not found", 404);
      return user;
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500);
    }
  };

  