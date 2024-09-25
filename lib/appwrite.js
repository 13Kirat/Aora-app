import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.kirat.aora",
	projectId: "66f3e09f001c53e57e50",
	databaseId: "66f3e26a0006bab47b81",
	userCollectionId: "66f3e297001039aceb4c",
	videoCollectionId: "66f3e2c6001f41763411",
	storageId: "66f3e4330018140b66c8",
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config;

const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const CreateUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) {
			throw new Error("Unable to Create Account!");
		}

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(
			email,
			password
		);
		return session;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const GetCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;
		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);
		if (!currentUser) throw Error;
		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
};

export const GetAllVideos = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			config.videoCollectionId
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const GetTrendingPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			config.videoCollectionId,
			[Query.orderDesc('$createdAt', Query.limit(7))]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};
