// page for verifying phone number
import {
	isClerkAPIResponseError,
	useSignIn,
	useSignUp,
} from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
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
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const router = useRouter();
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
	const { signUp, setActive } = useSignUp();
	const { signIn } = useSignIn();

	const openLink = () => {
		Linking.openURL('https://galaxies.dev');
	};

	// if new user => send OTP code to user
	const sendOTP = async () => {
		console.log('sendOTP', phoneNumber);
		setLoading(true);
		try {
			await signUp!.create({
				phoneNumber,
			});
			signUp!.preparePhoneNumberVerification();

			router.push(`/verify/${phoneNumber}`);
		} catch (err) {
			console.log('Error', JSON.stringify(err, null, 2));

			if (isClerkAPIResponseError(err)) {
				if (
					err.errors[0].code ===
					'form_identifier_exists'
				) {
					// User signed up before
					console.log(
						'User account already created'
					);
					await trySignIn();
				} else {
					setLoading(false);
					Alert.alert(
						'Error',
						err.errors[0].message
					);
				}
			}
		}
	};

	// if user is already created
	const trySignIn = async () => {
		console.log('trySignIn', phoneNumber);

		const { supportedFirstFactors } = await signIn!.create({
			identifier: phoneNumber,
		});

		const firstPhoneFactor: any = supportedFirstFactors.find(
			(factor: any) => {
				return factor.strategy === 'phone_code';
			}
		);

		const { phoneNumberId } = firstPhoneFactor;

		await signIn!.prepareFirstFactor({
			strategy: 'phone_code',
			phoneNumberId,
		});

		router.push(`/verify/${phoneNumber}?signin=true`);
		setLoading(false);
	};

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
