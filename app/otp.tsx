// page for verifying phone number
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Linking,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { bottom } = useSafeAreaInsets();

export default function Page() {
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');

	const router = useRouter();
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

	const openLink = () => {
		Linking.openURL('https://galaxies.dev');
	};

	const sendOTP = async () => {};

	const trySignIn = async () => {};

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={keyboardVerticalOffset}
			className="flex">
			<View className="flex flex-col h-full items-center p-5 gap-5">
				<Text className="text-md text-gray-500">
					Whatsapp will need to verify your
					account. Carrier charges may apply.
				</Text>

				<View className="bg-white w-[90%] rounded-md">
					<View className="flex flex-row justify-between items-center p-6">
						<Text className="">USA</Text>
						<Ionicons
							name="chevron-forward"
							size={24}
							color=""
						/>
					</View>
					<View className="self-center w-[90%] border-[1px] mb-3 opacity-10" />
				</View>
				<Text className="">
					You must be{' '}
					<Text>at least 16 years old</Text> to
					register. Learn how WhatsApp works with
					the <Text>Meta Companies</Text>.
				</Text>

				<View className="grow" />

				<TouchableOpacity
					disabled={phoneNumber === ''}
					className={
						phoneNumber !== ''
							? `w-full items-center bg-blue-500 rounded-lg py-3 ${bottom}`
							: `w-full items-center bg-gray-300 rounded-lg py-3 ${bottom}`
					}
					onPress={sendOTP}>
					<Text className="text-lg font-semibold">
						Next
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
