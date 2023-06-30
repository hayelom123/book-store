import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
// import { SliderBox } from "react-native-image-slider-box";

import React from "react";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import icons from "../../constants/icons";
import styles from "../../styles/detail.style";
import currencyFormat from "../../utils/currencyfrmat";
import ChatCard from "../../components/common/chatcard/ChatCard";

function BookDeatil() {
  const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", // Network image
    // require('./assets/images/girl.jpg'),          // Local image
  ];
  const { id } = useLocalSearchParams();
  const router = useRouter();
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
          headerTitle: id,
          headerShadowVisible: false,
        }}
      />
      <View>
        {/* <SliderBox
          images={images}
          autoplay={true}
          autoplayInterval={10000}
          circleLoop={true}
        /> */}
      </View>
      <View style={styles.chatContainer}>
        <Text style={styles.title}>title</Text>
        <Text>
          Description of the book... Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.discount}>10%</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{currencyFormat(57600)}</Text>
            <Text style={styles.currency}>원</Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: "#F7F8FA", height: 2 }}></View>
      <View style={styles.chatContainer}>
        <ChatCard />
      </View>
    </SafeAreaView>
  );
}

export default BookDeatil;
