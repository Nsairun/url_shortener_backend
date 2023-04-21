import UserRepository from "./user.repo";

const bcrypt = require("bcrypt");
const uuid = require("uuid");

export default class UserService {
  constructor() {
    this.userRepo = new UserRepository(); // i've put all my sequelize functions in UserRepository().. things like findByPk(), findOne(), create(), update(), destroy()...
  }

  async getAllUsers() {
    const allUsers = await this.userRepo.getAllUser();
    return allUsers;
  }

  async registerUser(user_name, password, email_address) {
    bcrypt.hash(password, +process.env.SALT_ROUNDS, async (err, hash) => {
      if (err) throw new Error("COULD_NOT_REGISTER_USER");

      const newUser = await this.userRepo.createUser({
        user_name,
        email_address,
        password: hash,
        api_key: uuid.v4(),
      });

      return newUser;
    });
  }

  async editOneUser(userToEdit, id) {
    const user = await this.userRepo.getUserById(id);

    if (!user) throw new Error("USER_DOES_NOT_EXIST");

    await this.userRepo.editUser(userToEdit, id);

    const updatedUser = await this.userRepo.getUserById(id);

    return updatedUser;
  }

  async deleteOneUser(id) {
    try {
      await this.userRepo.dropUser(id);
    } catch {
      throw new Error("COULD_NOT_DELETE_USER");
    }
  }

  /* 
    ma bro Kadji, i'm sure you are to write the login function here as well,
    remember that getUserByEmail(emai_address) is 
    allready in the UserRepository class
  */
}
