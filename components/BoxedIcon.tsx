import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export type BoxedIconProps = {
	name: typeof Ionicons.defaultProps;
	backgroundColor: string;
};

export default function BoxedIcon({ name, backgroundColor }: BoxedIconProps) {
	return (
		<View style={{ backgroundColor }} className="p-3 rounded-lg">
			<Ionicons name={name} size={22} color={'#fff'} />
		</View>
	);
}
