import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
// import { SliderBox } from "react-native-image-slider-box";

import React, { useState } from "react";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import icons from "../../constants/icons";
import styles from "../../styles/detail.style";
import currencyFormat from "../../utils/currencyfrmat";
import ChatCard from "../../components/common/chatcard/ChatCard";
import IconButton from "../../components/common/icon-btn/IconButton";
import Carousel from "../../components/carousel/Carousel";
import useFetch from "../../hooks/useFetch";
import ENDPOINT from "../../api/contstants";

function BookDeatil() {
  let images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", // Network image
    // require('./assets/images/girl.jpg'),          // Local image
  ];
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error, retry } = useFetch({
    path: `/api/book/${id}`,
  });

  if (data) {
    images = [data.coverImage, ...images];
  }

  if (data)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Stack.Screen
          options={{
            headerStyle: {},
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.chevronLeft}
                dimension="60%"
                handlePress={() => router.back()}
              />
            ),
            headerTitleAlign: "center",
            headerTitle: data.title,
            headerBackTitleVisible: false,
            headerShadowVisible: false,
          }}
        />
        {loading && (
          <View>
            <ActivityIndicator size={50} />
          </View>
        )}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={retry} />
          }
        >
          <Carousel images={images} />

          <View style={{ flex: 1 }}>
            <View style={styles.chatContainer}>
              <Text style={styles.title}>{data.title}</Text>
              <Text>{data.description}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.discount}>{data.discountRate}%</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{currencyFormat(data.price)}</Text>
                  <Text style={styles.currency}>원</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: "#F7F8FA", height: 2 }}></View>
            <View style={styles.chatContainer}>
              <ChatCard />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            zIndex: 10,
            backgroundColor: "white",
            borderTopColor: "#F7F8FA",
            borderTopWidth: 2,
            alignItems: "center",
          }}
        >
          <IconButton path={icons.image} />
          <TextInput
            placeholder="댓글을 남겨주세요."
            style={{ flex: 1, padding: 5 }}
          />
          <Text>등록</Text>
        </View>
      </SafeAreaView>
    );
  if (error)
    return (
      <View style={{ paddingVertical: 50 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {error.message}
        </Text>
        <Button title="Retry" onPress={retry} />
        {loading && (
          <View>
            <ActivityIndicator size={50} />
          </View>
        )}
      </View>
    );
  return (
    <View>
      <ActivityIndicator size={50} />
    </View>
  );
}

export default BookDeatil;
