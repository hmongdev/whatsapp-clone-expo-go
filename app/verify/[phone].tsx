import {
	isClerkAPIResponseError,
	useSignIn,
	useSignUp,
} from '@clerk/clerk-expo';
import clsx from 'clsx';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

export default function Page() {
	const { phone, signin } = useLocalSearchParams<{
		phone: string;
		signin: string;
	}>();

	const [code, setCode] = useState('');

	const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	const { signUp, setActive } = useSignUp();
	const { signIn } = useSignIn();

	// useEffect that checks the code
	useEffect(() => {
		if (code.length === 6) {
			console.log(code);
			// verify code
			if (signin === 'true') {
				console.log('signin');
				verifySignIn();
			} else {
				verifyCode();
			}
		}
	}, [code]);

	// verifies OTP code
	const verifyCode = async () => {
		try {
			await signUp!.attemptPhoneNumberVerification({
				code,
			});

			await setActive!({ session: signUp!.createdSessionId });
		} catch (err) {
			console.log('error', JSON.stringify(err, null, 2));
			if (isClerkAPIResponseError(err)) {
				Alert.alert('Error', err.errors[0].message);
			}
		}
	};

	const verifySignIn = async () => {
		try {
			await signIn!.attemptFirstFactor({
				strategy: 'phone_code',
				code,
			});

			await setActive!({ session: signIn!.createdSessionId });
		} catch (err) {
			console.log('error', JSON.stringify(err, null, 2));
			if (isClerkAPIResponseError(err)) {
				Alert.alert('Error', err.errors[0].message);
			}
		}
	};

	const resendCode = async () => {
		try {
			if (signin === 'true') {
				const { supportedFirstFactors } =
					await signIn!.create({
						identifier: phone,
					});

				const firstPhoneFactor: any =
					supportedFirstFactors.find(
						(factor: any) => {
							return (
								factor.strategy ===
								'phone_code'
							);
						}
					);

				const { phoneNumberId } = firstPhoneFactor;

				await signIn!.prepareFirstFactor({
					strategy: 'phone_code',
					phoneNumberId,
				});
			} else {
				await signUp!.create({
					phoneNumber: phone,
				});
				signUp!.preparePhoneNumberVerification();
			}
		} catch (err) {
			console.log('error', JSON.stringify(err, null, 2));
			if (isClerkAPIResponseError(err)) {
				Alert.alert('Error', err.errors[0].message);
			}
		}
	};

	return (
		<View className="flex grow items-center gap-20 p-8 pt-48 bg-white">
			<Stack.Screen options={{ headerTitle: phone }} />
			<Text className="text-sm text-center">
				We have sent you an SMS with a code to the
				number above.
			</Text>
			<Text className="text-sm text-center">
				To complete your phone number verification,
				please enter the 6-digit activation code.
			</Text>
			<View className="items-center justify-center w-full py-5">
				<CodeField
					ref={ref}
					{...props}
					value={code}
					onChangeText={setCode}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFieldRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({
						index,
						symbol,
						isFocused,
					}) => (
						<View
							// Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
							onLayout={getCellOnLayoutHandler(
								index
							)}
							key={index}
							className={clsx(
								'w-10 h-10 rounded-lg justify-center items-center border',
								isFocused &&
									'border-b'
							)}>
							<Text className="text-black text-xl text-center">
								{symbol ||
									(isFocused ? (
										<Cursor />
									) : null)}
							</Text>
						</View>
					)}
				/>
			</View>
			<TouchableOpacity
				className="w-full items-center"
				onPress={resendCode}>
				<Text className="text-primary text-md">
					Didn't receive a verification code?
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	codeFieldRoot: {
		marginTop: 20,
		width: 260,
		marginLeft: 'auto',
		marginRight: 'auto',
		gap: 4,
	},
});
