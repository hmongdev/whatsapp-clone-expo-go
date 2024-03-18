import contacts from '@/assets/data/contacts.json';
import { Image, Text, View } from 'react-native';
import { AlphabetList } from 'react-native-section-alphabet-list';

export default function Page() {
	const data = contacts.map((contact, index) => ({
		value: `${contact.first_name} ${contact.last_name}`,
		name: `${contact.first_name} ${contact.last_name}`,
		img: contact.img,
		desc: contact.desc,
		key: `${contact.first_name} ${contact.last_name}-${index}`,
	}));

	return (
		<View className="flex pt-110 bg-white">
			<AlphabetList
				data={data}
				stickySectionHeadersEnabled
				indexLetterStyle={{
					color: 'white',
					fontSize: 12,
				}}
				indexContainerStyle={{
					width: 24,
					backgroundColor: 'white',
				}}
				renderCustomItem={(item: any) => (
					<>
						<View className="flex flex-row items-center gap-10 h-50 px-14 bg-white">
							<Image
								source={{
									uri: item.img,
								}}
								className="w-30 h-30 border-sm"
							/>
							<View>
								<Text
									style={{
										color: '#000',
										fontSize: 14,
									}}>
									{
										item.value
									}
								</Text>
								<Text className="bg-gray font-sm">
									{item
										.desc
										.length >
									40
										? `${item.desc.substring(
												0,
												40
										  )}...`
										: item.desc}
								</Text>
							</View>
						</View>
						<View className="ml-50" />
					</>
				)}
				renderCustomSectionHeader={(section: any) => (
					<View className="h-30 bg-white justify-center px-14">
						<Text className="text-gray">
							{section.title}
						</Text>
					</View>
				)}
				className="ml-14"
			/>
		</View>
	);
}
