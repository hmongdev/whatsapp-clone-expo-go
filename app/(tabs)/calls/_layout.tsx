import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: 'Calls',
					headerLargeTitle: true,
					headerTransparent: true,
					headerBlurEffect: 'regular',
					headerStyle: {
						backgroundColor: 'white',
					},
					headerSearchBarOptions: {
						placeholder: 'Search',
					},
					headerRight: () => (
						<TouchableOpacity>
							<Ionicons
								name="call-outline"
								color="blue"
								size={30}
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
};
export default Layout;
