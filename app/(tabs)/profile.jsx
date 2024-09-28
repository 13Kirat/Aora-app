import {
	FlatList,
	Image,
	RefreshControl,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { getUserPosts, signOut } from "../../lib/appwrite";

import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import { router } from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();
	const [refreshing, setRefreshing] = useState(false);
	const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);

		router.replace("/sign-in");
	};
	return (
		<SafeAreaView className="h-full text-white bg-primary">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={({}) => (
					<View className="flex items-center justify-center w-full px-4 mt-6 mb-12">
						<TouchableOpacity
							onPress={logout}
							className="flex items-end w-full mb-10"
						>
							<Image
								source={icons.logout}
								resizeMode="contain"
								className="w-6 h-6"
							/>
						</TouchableOpacity>

						<View className="flex items-center justify-center w-16 h-16 border rounded-lg border-secondary">
							<Image
								source={{ uri: user?.avatar }}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>

						<InfoBox
							title={user?.username}
							containerStyles="mt-5"
							titleStyles="text-lg"
						/>

						{/* <View className="flex flex-row mt-5">
							<InfoBox
								title={posts.length || 0}
								subtitle="Posts"
								titleStyles="text-xl"
								containerStyles="mr-10"
							/>
							<InfoBox
								title="1.2k"
								subtitle="Followers"
								titleStyles="text-xl"
							/>
						</View> */}
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found"
						subtitle="Be the first one to upload the video"
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default Profile;
