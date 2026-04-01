import * as Location from "expo-location";
import { useState } from "react";
import { Text, View } from "react-native";

type Coords = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

export default function Index() {
  // permesso di geo
  const [permesso, richiediPermesso] = Location.useForegroundPermissions();
  // gestioni di stato
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(false);

  if (!permesso) return <View />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
