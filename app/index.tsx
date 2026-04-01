import * as Location from "expo-location";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

  if (!permesso.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.testo}>Serve il permesso della posizione</Text>
        <Pressable style={styles.btn} onPress={richiediPermesso}>
          <Text style={styles.btnTesto}>Dai il permesso</Text>
        </Pressable>
      </View>
    );
  }

  const getPosizione = async () => {
    setLoading(true);
    const posizione = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setCoords(posizione.coords);
    setLoading(false);
  };

  return (
    <View style={styles.contenitore}>
      {coords ? (
        <View style={styles.card}>
          <Text style={styles.label}>Latitudine</Text>
          <Text style={styles.valore}>{coords.latitude.toFixed(6)}</Text>
          <Text style={styles.label}>Longitudine</Text>
          <Text style={styles.valore}>{coords.longitude.toFixed(6)}</Text>
          <Text style={styles.label}>Precisione</Text>
          <Text style={styles.valore}>{coords.accuracy?.toFixed(0)}m</Text>
        </View>
      ) : (
        <Text style={styles.testo}>
          Premi il bottone per ottenere la posizione
        </Text>
      )}

      <Pressable
        style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}
        onPress={getPosizione}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnTesto}>📍 Dove sono?</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenitore: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 24,
    backgroundColor: "#f8f8f8",
  },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", gap: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    gap: 4,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  label: { fontSize: 12, color: "#888", marginTop: 8 },
  valore: { fontSize: 20, fontWeight: "600", color: "#4f46e5" },
  testo: { fontSize: 16, color: "#888", textAlign: "center" },
  btn: {
    backgroundColor: "#4f46e5",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  btnTesto: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
