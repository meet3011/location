import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {MapView,Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = {};
  if (errorMsg) {
    text = {error:errorMsg};
  } else if (location) { 
    text = {latitude:location.coords.latitude,longitude:location.coords.longitude};
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} >
        <Marker
          coordinate={{ latitude : 19.2864238 , longitude : 72.8593493 }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
