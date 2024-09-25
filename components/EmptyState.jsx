import { Image, StyleSheet, Text, View } from "react-native";

import CustomButton from "./CustomButton";
import React from "react";
import { images } from "../constants";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
	return (
		<View className="items-center justify-center px-4">
			<Image
				source={images.empty}
				className="w-[270px] h-[215px]"
				resizeMode="contain"
			/>
			<Text className="mt-2 text-2xl text-center text-white font-psemibold">
				{title}
			</Text>
			<Text className="text-sm text-gray-100 font-pmedium">
				{subtitle}
			</Text>
			<CustomButton
				title="Create Video"
				handlePress={() => router.push("/create")}
				containerStyles="w-full my-5"
			/>
		</View>
	);
};

export default EmptyState;

const styles = StyleSheet.create({});
