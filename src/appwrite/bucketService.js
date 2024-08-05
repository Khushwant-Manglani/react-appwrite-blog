import { bucket } from "./config";
import { keys } from "../config";

const { appwriteBucketId } = keys;

class BucketService {
  /**
   * Uploads a file to the specified Appwrite bucket.
   * @param {File} file - The file to upload.
   * @returns {Promise<Object|null>} The uploaded file object or null if failed.
   */
  async uploadFile(file) {
    try {
      const upload = await bucket.createFile(
        appwriteBucketId,
        ID.unique(),
        file
      );

      if (!upload) {
        console.error("Failed to upload the file with appwrite");
        return null;
      }

      return upload;
    } catch (error) {
      console.error(
        "Error occurred while uploading the file with appwrite",
        error
      );
      throw error;
    }
  }

  /**
   * Deletes a file from the specified Appwrite bucket.
   * @param {string} fileId - The ID of the file to delete.
   * @returns {Promise<void>}
   */
  async deleteFile(fileId) {
    try {
      await bucket.deleteFile(appwriteBucketId, fileId);
    } catch (error) {
      console.error(
        "Error occurred while deleting the file with appwrite",
        error
      );
      throw error;
    }
  }

  /**
   * Gets a preview URL for a file in the specified Appwrite bucket.
   * @param {string} fileId - The ID of the file to preview.
   * @returns {string} The URL to preview the file.
   */
  getFilePreview(fileId) {
    try {
      const previewUrl = bucket.getFilePreview(appwriteBucketId, fileId);

      if (!previewUrl) {
        console.error(
          "Failed to get preview url of the uploaded file with appwrite"
        );
      }

      return previewUrl;
    } catch (error) {
      console.error(
        "Error occurred while previewing the file with appwrite",
        error
      );
      throw error;
    }
  }
}

const bucketService = new BucketService();
export default bucketService;
