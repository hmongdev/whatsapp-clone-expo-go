import { Stack } from 'expo-router';
const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Settings',
					headerLargeTitle: true,
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: 'white',
					},

					headerSearchBarOptions: {
						placeholder: 'Search',
					},
				}}
			/>
		</Stack>
	);
};
export default Layout;
