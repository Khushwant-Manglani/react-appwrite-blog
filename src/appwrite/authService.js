import { account, ID } from "./config";

class AuthService {
  /**
   * Signs up a new user.
   * @param {Object} user - The user details.
   * @param {string} user.email - The user's email.
   * @param {string} user.password - The user's password.
   * @param {string} user.name - The user's name.
   * @returns {Promise<Object>} The login session object or null if failed
   */
  async signup({ email, password, name }) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) {
        console.error("Failed to create the user account with appwrite");
        return null;
      }

      return await this.login({ email, password });
    } catch (error) {
      console.error(
        "Error occurred while sign up the user with appwrite",
        error
      );
      throw error;
    }
  }

  /**
   * Logs in a user.
   * @param {Object} credentials - The user credentials.
   * @param {string} credentials.email - The user's email.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise<Object>} The login session object or null if failed
   */
  async login({ email, password }) {
    try {
      const userAccountSession = await account.createEmailPasswordSession(
        email,
        password
      );

      if (!userAccountSession) {
        console.error("Failed to create the login session with appwrite");
        return null;
      }

      return userAccountSession;
    } catch (error) {
      console.error("Error occurred while login the user with appwrite", error);
      throw error;
    }
  }

  /**
   * Gets the currently logged-in user account.
   * @returns {Promise<Object>} The user account object or null if failed
   */
  async getAccount() {
    try {
      const userAccount = await account.get();

      if (!userAccount) {
        console.error("Failed to get the user account with appwrite");
        return null;
      }

      return userAccount;
    } catch (error) {
      console.error("Error occurred while get the user account", error);
      throw error;
    }
  }

  /**
   * Logs out the currently logged-in user.
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await account.deleteSessions();
    } catch (error) {
      console.error("Error occurred while delete the user account", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
