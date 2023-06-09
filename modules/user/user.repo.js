const User = require("../../models/userModel");

class UserRepository {
  getAllUser() {
    return User.findAll();
  }

  getUserById(id) {
    return User.findByPk(id);
  }

  getUserByEmail(email_address) {
    return User.findOne({ where: { email_address } });
  }

  getOnlineAndOfflineEmail(email_address) {
    return User.findOne({
      where: { email_address },
      paranoid: false,
    });
  }

  createUser(user) {
    return User.create(user);
  }

  editUser(user, id) {
    return User.update(user, { where: { id } });
  }

  dropUser(id) {
    return User.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
