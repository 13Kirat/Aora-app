import { Text, TouchableOpacity } from "react-native";

import React from "react";

const CustomButton = ({
	title = "Button",
	handlePress = () => {},
	containerStyles = "",
	textStyles = "",
	isLoading = false,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
			activeOpacity={0.7}
		>
			<Text
				className={`text-primary text-lg font-psemibold ${textStyles}`}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
