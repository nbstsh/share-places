import React from 'react';
import { Button } from 'react-native';

const FetchLocation = ({ onGetLocation }) => {
	return <Button title='Get Location' onPress={onGetLocation} />;
};

export default FetchLocation;
