import type { FormData } from "@/app/(auth)/sign-up";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  project: "670fef6a0031368e788f",
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.bourka",
  databaseId: "670fef9a0006bb703019",
  userCollectionId: "670fef9e0021146c3f94",
  videCollectionId: "670ff038003e2aaf1a66",
  Storage: "670ff12f0032a0189c95",
};

const {
  project,
  endpoint,
  platform,
  databaseId,
  userCollectionId,
  videCollectionId,
  Storage,
} = config;
const client = new Client();
client.setEndpoint(endpoint).setProject(project).setPlatform(platform);

export const account = new Account(client);
export const avatar = new Avatars(client);
export const database = new Databases(client);

export async function createNewUser(formData: FormData) {
  const { email, password, username } = formData;
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );
    const avatarUrl = avatar.getInitials(username);
    await signIn(email, password);

    await database.createDocument(databaseId, userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatarUrl,
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );
    return currentUser.documents[0];
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

function getAllPosts() {
  return database.listDocuments(databaseId, videCollectionId);
}

export async function getAllVideos() {
  try {
    const posts = await database.listDocuments(databaseId, videCollectionId);
    return { success: true, data: posts.documents };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function getLatestPosts() {
  try {
    const posts = await database.listDocuments(databaseId, videCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return { success: true, data: posts.documents };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
