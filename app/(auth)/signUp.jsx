import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const SignUp = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});
	const submit = () => {};
	const [isSubmitting, setIsSubmitting] = useState(false);
	return (
		<SafeAreaView className={"bg-primary h-full"}>
			<ScrollView>
				<View className="justify-center w-full h-full px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="mt-10 text-2xl text-white font-psemibold">
						SignUp to Aora
					</Text>
					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(e) =>
							setForm({ ...form, username: e })
						}
						otherStyles="mt-10"
					/>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) =>
							setForm({ ...form, password: e })
						}
						otherStyles="mt-7"
					/>
					<CustomButton
						title="SignUp"
						handlePress={submit}
						containerStyles="my-7"
						isLoading={isSubmitting}
					/>
					<View className="flex-row justify-center gap-2 pt-5">
						<Text className="text-lg text-gray-100 font-pmedium">
							Have an account already?
						</Text>
						<Link
							className="text-lg font-psemibold text-secondary"
							href={"/signIn"}
						>
							SignIn
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
