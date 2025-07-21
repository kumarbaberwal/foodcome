import { CreateUserParams, SignInParams } from "@/interfaces";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: 'com.kumar.foodcome',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  apiKey: process.env.EXPO_PUBLIC_APPWRITE_API_KEY!,
  databaseId: "687d55fa001231166a80",
  userCollectionId: "687d56290009335e3c4b",
};


export const client = new Client();


client.setEndpoint(appWriteConfig.endpoint).setProject(appWriteConfig.projectId).setPlatform(appWriteConfig.platform);

export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (!newAccount) {
      throw new Error("Failed to create user account");
    }
    await signIn({ email, password });
    const avatarUrl = avatars.getInitialsURL(name);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        name,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      }
    )
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error as string);
  }
}


export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error("Failed to sign in");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error(error as string);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("Failed to get current user");
    }
    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    throw new Error(error as string);

  }
}