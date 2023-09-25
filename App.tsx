import { useEffect, useState } from 'react';

import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	LocationObject,
} from 'expo-location';

import { View } from 'react-native';

import { styles } from './styles';

export default function App() {
	const [location, setLocation] = useState<LocationObject | null>(null);

	async function requestLocationPermissions() {
		const { granted } = await requestForegroundPermissionsAsync();

		if (granted) {
			const currentPosition = await getCurrentPositionAsync();
			setLocation(currentPosition);

			console.log(currentPosition, 'current position');
		}
	}

	useEffect(() => {
		requestLocationPermissions();
	}, []);

	return (
		<View style={styles.container}>
			<></>
		</View>
	);
}
