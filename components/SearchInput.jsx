import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
	const pathname = usePathname();
	const [query, setQuery] = useState(initialQuery || "");
	return (
		<View className="flex-row items-center w-full h-16 px-4 space-x-4 border-2 border-black-100 bg-black-100 rounded-2xl focus:border-secondary">
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular"
				value={query}
				placeholder="Search for a video topic"
				placeholderTextColor={"#cdcde0"}
				onChangeText={(e) => setQuery(e)}
			/>

			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert(
							"Missing Query",
							"Please input something to search results across database"
						);
					}
					if (pathname.startsWith("/search"))
						router.setParams({ query });
					else
						router.push({
							pathname: `/search/${query}`,
						});
				}}
			>
				<Image
					source={icons.search}
					className="w-5 h-5"
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;

const styles = StyleSheet.create({});
