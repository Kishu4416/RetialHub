import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";


export default function ScannerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.product?.item;

  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data, productId }) => {
    try {
      const productDetails = JSON.parse(data);
      setScanData(productDetails);
      setError(null);

      if (productDetails && productDetails._id) {
        navigation.navigate("ProductDetailsScreen", {
          product: productDetails,
        });
      } else {
        setError("Invalid QR code format. Please scan a valid QR code.");
      }
    } catch (error) {
      setError("Invalid QR code format. Please scan a valid QR code.");
       // console.error('Error handling scanned data:', error);
    }
  };

  const handleScanAgain = () => {
    setScanData(null); 
    setError(null); 
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to the app.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      {error && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: responsiveFontSize(2), color: "white" }}>
            {error}
          </Text>
          <TouchableOpacity onPress={handleScanAgain}>
            <Text
              style={{
                color: "white",
                padding: responsiveWidth(3),
                backgroundColor: "black",
              }}
            >
              Scan Again
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
