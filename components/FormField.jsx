import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-gray-100 font-pmedium">
				{title}
			</Text>
			<View className="flex-row items-center w-full h-16 px-4 border-2 border-black-100 bg-black-100 rounded-2xl focus:border-secondary">
				<TextInput
					className="flex-1 text-base text-white font-psemibold"
					value={value}
					placeholder={placeholder}
					placeholderTextColor={"#7b7b8b"}
					onChangeText={handleChangeText}
					secureTextEntry={title === "Password" && !showPassword}
				/>
				{title === "Password" && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
					>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className="w-6 h-6"
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormField;

const styles = StyleSheet.create({});
