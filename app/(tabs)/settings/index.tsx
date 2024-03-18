import BoxedIcon from '@/components/BoxedIcon';
import { devices, items, support } from '@/constants';
import colors from '@/constants/colors';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Page() {
	const { signOut } = useAuth();

	const onSignOut = () => {
		signOut();
	};

	return (
		<View className="flex bg-white">
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				contentContainerStyle={{ paddingBottom: 40 }}>
				<View className="bg-green-500 border-sm mx-14 mt-20">
					<FlatList
						data={devices}
						scrollEnabled={false}
						ItemSeparatorComponent={() => (
							<View className="bg-red-300 ml-50 w-[90%]" />
						)}
						renderItem={({ item }) => (
							<View className="bg-red-500 flex flex-row items-center p-10 gap-5">
								<BoxedIcon
									name={
										item.icon
									}
									backgroundColor={
										item.backgroundColor
									}
								/>

								<Text className="my-auto text-center font-lg">
									{
										item.name
									}
								</Text>
								<Ionicons
									name="chevron-forward"
									size={
										20
									}
									color={
										colors.gray
									}
								/>
							</View>
						)}
					/>
				</View>

				<View className="bg-white border-sm mx-14 mt-20">
					<FlatList
						data={items}
						scrollEnabled={false}
						ItemSeparatorComponent={() => (
							<View className="bg-gray-300 ml-50 w-[90%]" />
						)}
						renderItem={({ item }) => (
							<View className="flex flex-row items-center p-10 gap-10">
								<BoxedIcon
									name={
										item.icon
									}
									backgroundColor={
										item.backgroundColor
									}
								/>

								<Text className="flex font-lg">
									{
										item.name
									}
								</Text>
								<Ionicons
									name="chevron-forward"
									size={
										20
									}
									color={
										colors.gray
									}
								/>
							</View>
						)}
					/>
				</View>

				<View className="bg-white border-sm mx-14 mt-20">
					<FlatList
						data={support}
						scrollEnabled={false}
						ItemSeparatorComponent={() => (
							<View className="bg-gray-300 ml-50 w-[90%]" />
						)}
						renderItem={({ item }) => (
							<View className="flex flex-row items-center p-10 gap-10">
								<BoxedIcon
									name={
										item.icon
									}
									backgroundColor={
										item.backgroundColor
									}
								/>

								<Text className="flex font-lg">
									{
										item.name
									}
								</Text>
								<Ionicons
									name="chevron-forward"
									size={
										20
									}
									color={
										colors.gray
									}
								/>
							</View>
						)}
					/>
				</View>

				<TouchableOpacity onPress={onSignOut}>
					<Text className=" font-lg text-center text-white py-14">
						Log Out
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}
