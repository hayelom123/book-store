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
import currencyFormat from "../../../utils/currencyfrmat";

function BookCard({ item }) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/details/${item.id}`)}>
      <View style={styles.container(width > 390 ? 187 : width)}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.thumbnail,
              // "https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?w=1738&ssl=1",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{item.title}</Text>
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
