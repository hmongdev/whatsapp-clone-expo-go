import welcomeImage from '@/assets/images/welcome.png';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

export default function WelcomeScreen() {
	const openLink = () => {
		Linking.openURL('https://galaxies.dev');
	};

	return (
		<View className="flex h-screen bg-white justify-center items-center p-20">
			<Image
				source={{ uri: welcome_image }}
				className="w-full h-[300] rounded-2xl"
			/>
			<Text className="text-xl text-center font-bold my-20">
				Welcome to WhatsApp Clone
			</Text>
			<Text className="text-sm text-center mb-20 text-gray-500">
				Read our{' '}
				<Text
					className="text-gray-500"
					onPress={openLink}>
					Privacy Policy
				</Text>
				. {'Tap "Agree & Continue" to accept the '}
				<Text
					className="text-gray-500"
					onPress={openLink}>
					Terms of Service
				</Text>
				.
			</Text>
			{/* `replace asChild` removes the header back button */}
			<Link href="/otp" replace asChild>
				<TouchableOpacity className="w-full items-center rounded-full py-4 bg-lightGray">
					<Text className="text-md font-semibold">
						Agree & Continue
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}
