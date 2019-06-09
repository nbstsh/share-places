import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const UsersMap = ({ userLocation }) => {
	console.log({ userLocation });
	return (
		<View style={styles.mapContainer}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121
				}}
				region={userLocation}
			>
				{userLocation ? <Marker coordinate={userLocation} /> : null}
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	mapContainer: {
		width: '100%',
		height: 200,
		marginTop: 20
	},
	map: {
		width: '100%',
		height: '100%'
	}
});

export default UsersMap;
