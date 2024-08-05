import { databases, ID, Query } from "./config";
import { keys } from "../config";

const { appwriteDatabaseId, appwriteCollectionId } = keys;

class DatabaseService {
  /**
   * Creates a new post in the database.
   * @param {Object} post - The post details.
   * @param {string} post.title - The title of the post.
   * @param {string} post.content - The content of the post.
   * @param {string} post.featuredImage - The featured image URL of the post.
   * @param {string} post.userId - The ID of the user creating the post.
   * @param {string} post.slug - The slug of the post.
   * @param {string} post.status - The status of the post.
   * @returns {Promise<Object|null>} The created post object or null if failed.
   */
  async createPost({ title, content, featuredImage, userId, slug, status }) {
    try {
      const post = await databases.createDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        ID.unique(),
        { title, content, featuredImage, userId, slug, status }
      );

      if (!post) {
        console.error("Failed to create the post with appwrite");
        return null;
      }

      return post;
    } catch (error) {
      console.error(
        "Error occurred while creating the post with appwrite",
        error
      );
      throw error;
    }
  }

  /**
   * Updates an existing post in the database.
   * @param {string} id - The ID of the post to update.
   * @param {Object} post - The post details to update.
   * @param {string} post.title - The title of the post.
   * @param {string} post.content - The content of the post.
   * @param {string} post.featuredImage - The featured image URL of the post.
   * @param {string} post.slug - The slug of the post.
   * @param {string} post.status - The status of the post.
   * @returns {Promise<Object|null>} The updated post object or null if failed.
   */
  async updatePost(postId, { title, content, featuredImage, slug, status }) {
    try {
      const updatedPost = await databases.updateDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        postId,
        { title, content, featuredImage, slug, status }
      );

      if (!updatedPost) {
        console.error("Failed to update the post with appwrite");
        return null;
      }

      return updatedPost;
    } catch (error) {
      console.error(
        "Error occurred while updating the post with appwrite",
        error
      );
      throw error;
    }
  }

  /**
   * Retrieves a post from the database by its ID.
   * @param {string} id - The ID of the post to retrieve.
   * @returns {Promise<Object|null>} The retrieved post object or null if failed.
   */
  async getPost(postId) {
    try {
      const post = await databases.getDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        postId
      );

      if (!post) {
        console.error("Failed to get the post with appwrite");
        return null;
      }

      return post;
    } catch (error) {
      console.error(
        "Error occurred while getting the post with appwrite",
        error
      );
      throw error;
    }
  }

  /**
   * Deletes a post from the database by its ID.
   * @param {string} id - The ID of the post to delete.
   * @returns {Promise<void>}
   */
  async deletePost(postId) {
    try {
      await databases.deleteDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        postId
      );
    } catch (error) {
      console.error(
        "Error occurred while deleting the post with appwrite",
        error
      );
      throw error;
    }
  }

  // query

  /**
   * Retrieves posts from the database based on queries.
   * @param {Array} queries - The queries to filter the posts.
   * @returns {Promise<Object|null>} The list of retrieved posts or null if failed.
   */
  async getPostsByQueries(queries = [Query.equal("status", "active")]) {
    try {
      const posts = databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionId,
        queries
      );

      if (!posts) {
        console.error("Failed to get the posts by queries with appwrite");
        return null;
      }

      return posts;
    } catch (error) {
      console.error(
        "Error occurred while getting the post by query with appwrite",
        error
      );
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
