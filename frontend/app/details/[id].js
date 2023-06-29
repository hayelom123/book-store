import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

import React from "react";

function BookDeatil() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen
        options={{
          headerStyle: {},

          headerTitleAlign: "center",
          headerTitle: id,
          headerShadowVisible: false,
        }}
      />
      <View>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  );
}

export default BookDeatil;
