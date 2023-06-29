import React from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import styles from "./bookcard.style";

function BookCard({ item }) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  function currencyFormat(num) {
    if (Number.isInteger(num))
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <TouchableOpacity onPress={() => router.push(`/details/${item}`)}>
      <View style={styles.container(width > 390 ? 187 : width)}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?w=1738&ssl=1",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>레이블라우스</Text>
          <View style={styles.textContainer}>
            <Text style={styles.discount}>10%</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{currencyFormat(57600)}</Text>
              <Text style={styles.currency}>원</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BookCard;
