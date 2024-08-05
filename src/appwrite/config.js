import { Client, Account, Databases, Storage, Query, ID } from "appwrite";
import { keys } from "../config";

const { appwriteApiEndpoint, appwriteProjectId } = keys;

const client = new Client()
  .setEndpoint(appwriteApiEndpoint)
  .setProject(appwriteProjectId);

const account = new Account(client);
const databases = new Databases(client);
const bucket = new Storage(client);

export { account, databases, bucket, Query, ID };
