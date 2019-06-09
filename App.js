import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

export default function App() {
	const [userLocation, setUserLocation] = useState(null);

	const onGetLocation = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				setUserLocation({
					latitude,
					longitude,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121
				});
			},
			err => {
				console.error(err);
			}
		);
	};

	return (
		<View style={styles.container}>
			<FetchLocation onGetLocation={onGetLocation} />
			<UsersMap userLocation={userLocation} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
