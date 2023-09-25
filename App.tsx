import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	LocationObject,
	watchPositionAsync,
	LocationAccuracy,
} from 'expo-location';

import MapView, { Marker } from 'react-native-maps';

export default function App() {
	const [location, setLocation] = useState<LocationObject | null>(null);

	const mapRef = useRef<MapView>(null);

	async function requestLocationPermissions() {
		const { granted } = await requestForegroundPermissionsAsync();

		if (granted) {
			const currentPosition = await getCurrentPositionAsync();
			setLocation(currentPosition);
		}
	}

	useEffect(() => {
		requestLocationPermissions();
	}, []);

	useEffect(() => {
		watchPositionAsync(
			{
				accuracy: LocationAccuracy.Highest,
				timeInterval: 1000,
				distanceInterval: 1,
			},
			(response) => {
				// console.log('NOVA LOCALIZACAO', response);
				setLocation(response);
				mapRef.current?.animateCamera({
					pitch: 70,
					center: response.coords,
				});
			}
		);
	}, []);

	return (
		<View style={styles.container}>
			{location && (
				<MapView
					ref={mapRef}
					style={styles.map}
					initialRegion={{
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
				>
					<Marker
						coordinate={{
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
						}}
					/>
				</MapView>
			)}
		</View>
	);
}
