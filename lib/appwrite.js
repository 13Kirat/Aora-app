import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
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
const storage = new Storage(client);

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
			videoCollectionId,
			[Query.orderDesc("$createdAt")]
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
			[Query.orderDesc("$createdAt", Query.limit(7))]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const searchPosts = async (query) => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			config.videoCollectionId,
			[Query.search("title", query)]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getUserPosts = async (userId) => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			config.videoCollectionId,
			[Query.equal("creator", userId)]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const signOut = async () => {
	try {
		const session = await account.deleteSession("current");
		return session;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export async function getFilePreview(fileId, type) {
	let fileUrl;

	try {
		if (type === "video") {
			fileUrl = storage.getFileView(storageId, fileId);
		} else if (type === "image") {
			fileUrl = storage.getFilePreview(
				storageId,
				fileId,
				2000,
				2000,
				"top",
				100
			);
		} else {
			throw new Error("Invalid file type");
		}

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error) {
		throw new Error(error);
	}
}

export async function uploadFile(file, type) {
	if (!file) return;

	// const { mimeType, ...rest } = file;
	// const asset = { type: mimeType, ...rest };
	const asset = {
		name: file.fileName,
		type: file.mimeType,
		size: file.fileSize,
		uri: file.uri,
	};

	try {
		const uploadedFile = await storage.createFile(
			storageId,
			ID.unique(),
			asset
		);

		const fileUrl = await getFilePreview(uploadedFile.$id, type);
		return fileUrl;
	} catch (error) {
		throw new Error(error);
	}
}

export async function createVideoPost(form) {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, "image"),
			uploadFile(form.video, "video"),
		]);

		const newPost = await databases.createDocument(
			databaseId,
			videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creator: form.userId,
			}
		);

		return newPost;
	} catch (error) {
		throw new Error(error);
	}
}
