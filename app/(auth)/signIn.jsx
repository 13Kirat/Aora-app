import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import { GetCurrentUser, signIn } from "../../lib/appwrite";

const SignIn = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill in all the fields.");
			return; // Add return to prevent further execution
		}

		setIsSubmitting(true);

		try {
			await signIn(form.email, form.password);
			const result = await GetCurrentUser();
			setUser(result);
			setIsLoggedIn(true);
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message || "An error occurred."); // Better error handling
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className={"bg-primary h-full"}>
			<ScrollView>
				<View className="justify-center w-full min-h-[85vh] px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="mt-10 text-2xl text-white font-psemibold">
						Login to Aora
					</Text>
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
						title="SignIn"
						handlePress={submit}
						containerStyles="my-7"
						isLoading={isSubmitting}
					/>
					<View className="flex-row justify-center gap-2 pt-5">
						<Text className="text-lg text-gray-100 font-pmedium">
							Don't have an Account?
						</Text>
						<Link
							className="text-lg font-psemibold text-secondary"
							href={"/signUp"}
						>
							SignUp
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
