import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import styles from "./carousel.style";

const Card = ({ image }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width, height: 200 }]}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
    </View>
  );
};

// const Carousel = ({ images = [] }) => {
//   const [inde, setInde] = useState(0);
//   const slideRef = useRef(null);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const viewableItemChanged = useRef(({ viewableItems }) => {
//     setInde(viewableItems[0].index);
//   }).current;
//   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
//   return (
//     <FlatList
//       data={images}
//       renderItem={({ item }) => <Card image={item} />}
//       horizontal
//       pagingEnabled={true}
//       keyExtractor={(item, index) => index}
//       bounces={false}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//         {
//           useNativeDriver: false,
//         }
//       )}
//       onViewableItemsChanged={viewableItemChanged}
//       viewabilityConfig={viewConfig}
//       showsHorizontalScrollIndicator={false}
//       scrollEventThrottle={32}
//       ref={slideRef}
//     />
//   );
// };

const Carousel = ({ images = [] }) => {
  const { width } = useWindowDimensions();
  const height = width * 0.6;
  const [active, setActive] = useState(0);
  const changeActive = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );

    if (slide >= images.length) {
      setActive(images.length - 1);
      return;
    }
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View
      style={{
        justifyContent: "center",
        width: width,
        backgroundColor: "#888",
        cursor: "pointer",
      }}
    >
      <View
        style={{
          maxHeight: 400,
          maxWidth: width,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* <Carousel images={images} /> */}
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={changeActive}
          scrollEnabled={true}
          // scrollEventThrottle={changeActive}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width, height, resizeMode: "cover" }}
            />
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
          }}
        >
          {images.map((image, index) => (
            <Text
              style={{
                color: active == index ? "#fff" : "#888",

                zIndex: 300,
                margin: 3,
                //   fontSize: width / 30,
              }}
              key={index}
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};
export default Carousel;
