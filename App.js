import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

const API_ENDPOINT = 'https://share-places-243208.firebaseio.com/places.json';

export default function App() {
	const [userLocation, setUserLocation] = useState(null);
	const [userLocations, setUserLocations] = useState([]);

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

				fetch(API_ENDPOINT, {
					method: 'POST',
					body: JSON.stringify({
						latitude,
						longitude
					})
				})
					.then(res => console.log(res))
					.catch(err => console.error(err));
			},
			err => {
				console.error(err);
			}
		);
	};

	const onGetUserPlaces = () => {
		const userLocations = [];
		fetch(API_ENDPOINT)
			.then(res => res.json())
			.then(data => {
				Object.keys(data).forEach(key => {
					const { latitude, longitude } = data[key];
					userLocations.push({
						id: key,
						latitude,
						longitude
					});
				});
				setUserLocations(userLocations);
			})
			.catch(err => console.error(err));
	};

	return (
		<View style={styles.container}>
			<View style={styles.fetchButtonContainer}>
				<Button title='Get user locations' onPress={onGetUserPlaces} />
			</View>
			<FetchLocation onGetLocation={onGetLocation} />
			<UsersMap
				userLocation={userLocation}
				userLocations={userLocations}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	fetchButtonContainer: {
		marginBottom: 20
	}
});
