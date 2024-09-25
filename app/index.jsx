import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";

import CustomButton from "../components/CustomButton";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
	const { isLoading, isLoggedIn } = useGlobalContext();
	if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
	return (
		<SafeAreaView className={"bg-primary h-full"}>
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full min-h-[85vh] px-4 justify-center items-center">
					<Image
						source={images.logo}
						className="w-[138px] h-[84px]"
						resizeMode="contain"
					/>
					<Image
						source={images.cards}
						className="max-w-[380px] w-full h-[300px]"
						resizeMode="contain"
					/>
					<View className="relative mt-3">
						<Text className="text-3xl font-bold text-center text-white">
							Discover Endless Possibilities With{" "}
							<Text className="text-secondary-200">Aora</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
							resizeMode="contain"
						/>
					</View>
					<Text className="mt-10 text-sm text-center text-gray-100 font-pregular">
						Where creativity meets Innovation: embark on a journey
						of limitless exploration with Aora
					</Text>
					<CustomButton
						title={"Continue With Email"}
						handlePress={() => router.push("/signIn")}
						containerStyles="w-full mt-7"
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
}
