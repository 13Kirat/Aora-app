import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import {
	Alert,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { createVideoPost } from "../../lib/appwrite";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
	const [uploading, setUploading] = useState(false);
	const [form, setForm] = useState({
		title: "",
		video: null,
		thumbnail: null,
		prompt: "No Prompt",
	});

	const { user } = useGlobalContext();

	const openPicker = async (selectType) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes:
				selectType === "image"
					? ImagePicker.MediaTypeOptions.Images
					: ImagePicker.MediaTypeOptions.Videos,
			aspect: [4, 3],
			quality: 1,
		});

		// const result = await DocumentPicker.getDocumentAsync({
		// 	type:
		// 		selectType === "image"
		// 			? ["image/png", "image/jpg", "image/jpeg"]
		// 			: ["video/mp4", "video/gif"],
		// });

		if (!result.canceled) {
			if (selectType === "image") {
				setForm({
					...form,
					thumbnail: result.assets[0],
				});
			}
			if (selectType === "video") {
				setForm({
					...form,
					video: result.assets[0],
				});
			}
		}
	};
	const submit = async () => {
		if (
			form.prompt === "" ||
			form.title === "" ||
			!form.thumbnail ||
			!form.video
		) {
			return Alert.alert("Please provide all fields");
		}

		setUploading(true);
		try {
			await createVideoPost({
				...form,
				userId: user.$id,
			});

			Alert.alert("Success", "Post uploaded successfully");
			router.push("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setForm({
				title: "",
				video: null,
				thumbnail: null,
				prompt: "",
			});
			setUploading(false);
		}
	};
	return (
		<SafeAreaView className="h-full bg-primary">
			<ScrollView className="px-4 py-6 ">
				<Text className="text-2xl text-white font-psemibold">
					Upload Video
				</Text>
				<FormField
					title="Video Title"
					value={form.title}
					handleChangeText={(text) =>
						setForm({ ...form, title: text })
					}
					placeholder="Give your video a catchy title..."
					otherStyles="mt-10"
				/>
				<View className="space-y-2 mt-7">
					<Text className="text-base text-gray-100 font-pmedium">
						Upload Video
					</Text>
					<TouchableOpacity onPress={() => openPicker("video")}>
						{form.video ? (
							<>
								<Video
									source={{ uri: form.video.uri }}
									className="w-full h-64 rounded-2xl"
									resizeMode={ResizeMode.COVER}
								/>
							</>
						) : (
							<View className="items-center justify-center w-full h-40 px-4 bg-black-100 rounded-2xl">
								<View className="items-center justify-center border border-dashed w-14 h-14 border-secondary-100">
									<Image
										source={icons.upload}
										className="w-1/2 h-1/2"
										resizeMode="contain"
									/>
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View className="space-y-2 mt-7">
					<Text className="text-base text-gray-100 font-pmedium">
						Thumbnail Image
					</Text>
					<TouchableOpacity onPress={() => openPicker("image")}>
						{form.thumbnail ? (
							<>
								<Image
									source={{ uri: form.thumbnail.uri }}
									className="w-full h-64 rounded-2xl"
									resizeMode="cover"
								/>
							</>
						) : (
							<View className="flex-row items-center justify-center w-full h-16 px-4 space-x-2 border-2 bg-black-100 border-black-200 rounded-2xl">
								<Image
									source={icons.upload}
									className="w-5 h-5"
									resizeMode="contain"
								/>
								<Text className="text-sm text-gray-100 font-pmedium">
									Choose a file
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>
				{/* <FormField
					title="AI Prompt"
					value={form.prompt}
					handleChangeText={(text) =>
						setForm({ ...form, prompt: text })
					}
					placeholder="The prompt you use to create this"
					otherStyles="mt-7"
				/> */}
				<CustomButton
					title="Submit & Publish"
					handlePress={submit}
					containerStyles="my-8"
					isLoading={uploading}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
