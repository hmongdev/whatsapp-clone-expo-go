// page for verifying phone number
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Linking,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MaskInput from 'react-native-mask-input';

const USA_PHONE = [
	'+',
	'1',
	' ',
	'(',
	/\d/,
	/\d/,
	/\d/,
	')',
	' ',
	/\d/,
	/\d/,
	/\d/,
	' ',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
];

export default function Page() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const openLink = () => {
		Linking.openURL('https://galaxies.dev');
	};

	const sendOTP = async () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(!loading);
			router.push(`/verify/${phoneNumber}`);
		}, 2000);
		setLoading(!loading);
	};

	const trySignIn = async () => {};

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={keyboardVerticalOffset}
			className="flex">
			<View className="flex flex-col h-full items-center p-5 gap-5">
				{loading && (
					<View className="justify-center h-screen pb-20">
						<ActivityIndicator
							size="large"
							color="blue"
						/>
						<Text className="text-md p-5">
							Sending code...
						</Text>
					</View>
				)}
				<View className="w-[90%]">
					<Text className="text-md text-gray-500">
						Whatsapp will need to verify
						your account. Carrier charges
						may apply.
					</Text>
				</View>

				<View className="bg-white w-[90%] rounded-md shadow-xl">
					<View className="flex flex-col justify-between items-center p-6">
						<View className="flex flex-row w-full justify-between">
							<Text className="text-lg font-semibold">
								USA
							</Text>
							<Ionicons
								name="chevron-forward"
								color="gray"
								size={24}
							/>
						</View>

						<View
							id="separator"
							className="self-center w-full border-[1px] my-3 opacity-5"
						/>
						<MaskInput
							className="w-full text-lg"
							value={phoneNumber}
							keyboardType="numeric"
							autoFocus
							placeholder="Enter Your 10-digit Phone Number"
							onChangeText={(
								masked,
								unmasked
							) => {
								setPhoneNumber(
									masked
								);
							}}
							mask={USA_PHONE}
						/>
					</View>
				</View>
				<Text className="text-center text-gray-700">
					You must be{' '}
					<Text className="text-primary">
						at least 16 years old
					</Text>{' '}
					to register. Learn how WhatsApp works
					with the{' '}
					<Text className="text-primary">
						Meta Companies
					</Text>
					.
				</Text>

				<View className="grow" />

				<TouchableOpacity
					disabled={phoneNumber === ''}
					className={
						phoneNumber !== ''
							? `w-4/5 items-center bg-blue-500 rounded-lg py-3`
							: `w-4/5 items-center bg-lightGray rounded-lg py-3`
					}
					onPress={sendOTP}>
					<Text
						className={
							phoneNumber !== ''
								? 'text-lg text-white font-semibold'
								: 'text-lg text-black font-semibold'
						}>
						Next
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
