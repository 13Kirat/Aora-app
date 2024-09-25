import {
	Alert,
	FlatList,
	Image,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { GetAllVideos, GetTrendingPosts } from "../../lib/appwrite";
import React, { useEffect, useState } from "react";

import EmptyState from "../../components/EmptyState";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import images from "../../constants/images";
import useAppwrite from "../../lib/useAppwrite";

const Home = () => {
	const [refreshing, setRefreshing] = useState(false);
	const { data: posts, refetch } = useAppwrite(GetAllVideos);
	const { data: latestPosts } = useAppwrite(GetTrendingPosts);
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	return (
		<SafeAreaView className="h-full text-white bg-primary">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={({}) => (
					<View className="px-4 my-6 space-y-6 ">
						<View className="flex-row items-start justify-between mb-6">
							<View>
								<Text className="text-sm text-gray-100 font-pmedium">
									Welcome Back
								</Text>
								<Text className="text-2xl text-white font-psemibold">
									JS Mastery
								</Text>
							</View>
							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="h-10 w-9"
									resizeMode="contain"
								/>
							</View>
						</View>

						<SearchInput />

						<View className="flex-1 w-full pt-5 pb-8">
							<Text className="mb-3 text-lg text-gray-100 font-pregular">
								Latest Videos
							</Text>
							<Trending posts={latestPosts} />
						</View>
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

export default Home;
