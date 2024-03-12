import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="inotpdex"
				options={{
					headerTitle: 'Enter Your Phone Number',
					headerBackVisible: false,
				}}
			/>
		</Stack>
	);
}
