import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import * as Location from "expo-location";
import { getstoreapi } from "../../../Api/Map/Map";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const LocationScreen = () => {
  const [maplocation, setMapLocation] = useState(null);
  const [cancelpermission, setcancelpermission] = useState(false);
  const [allstore, setallStore] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getStore = async () => {
    try {
      const list = await getstoreapi();
      setallStore(list);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    getStore();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setcancelpermission(true);
        return;
      }
      Location.watchPositionAsync({}, (newLocation) => {
        setMapLocation(newLocation.coords);
      });
    })();
  }, []);

  const handlecancelpermission = () => {
    Alert.alert("Permission cancel", "Please Allow the Location permission", [
      {
        text: "OK",
        onPress: () => {
          console.log("OK pressed");
        },
      },
    ]);
  };

  const handlelocationpermission = useCallback(async () => {
    await Linking.openSettings();
  });

  const handleRefresh = () => {
    setRefreshing(true);
    getStore();

    // Request location permission and refresh the location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setcancelpermission(true);
        setRefreshing(false);
        return;
      }
      Location.watchPositionAsync({}, (newLocation) => {
        setMapLocation(newLocation.coords);
        setRefreshing(false);
      });
    })();
  };

  return (
    <View style={styles.container}>
      {cancelpermission ? (
        <>
          <Text>Location Permission cancel</Text>

          <Pressable
            onPress={() => {
              handlelocationpermission();
            }}
            style={{
              height: responsiveHeight(6),
              width: responsiveWidth(30),
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Give Permission</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable onPress={() => handlecancelpermission}></Pressable>

          {maplocation && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: maplocation.latitude,
                longitude: maplocation.longitude,
                latitudeDelta: 0.00322,
                longitudeDelta: 0.02421,
              }}
            >
              {maplocation && (
                <Marker
                  coordinate={{
                    latitude: maplocation.latitude,
                    longitude: maplocation.longitude,
                  }}
                  title="Your Location"
                >
                  <Image
                    source={require("../../../assets/location3.jpeg")}
                    style={{
                      height: responsiveHeight(5),
                      width: responsiveWidth(6),
                    }}
                  />
                </Marker>
              )}

              {allstore && allstore.length > 0
                ? allstore.map((store) => (
                    <Marker
                      key={store._id}
                      coordinate={{
                        latitude: store.location.coordinates[1],
                        longitude: store.location.coordinates[0],
                      }}
                      title={store.name}
                      description={store.timing}
                    ></Marker>
                  ))
                : null}
            </MapView>
          )}
          <Pressable onPress={handleRefresh} style={styles.refreshButton}>
            <Feather
              name="refresh-ccw"
              size={responsiveFontSize(3)}
              color="black"
            />
            <Text style={{ fontSize: responsiveFontSize(2) }}>Refresh</Text>
          </Pressable>

          {refreshing && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="large" color="black" />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  refreshButton: {
    position: "absolute",
    bottom: responsiveHeight(5),
    right: responsiveWidth(2),
    //backgroundColor: "blue",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LocationScreen;
