import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: (width) => ({
    width,
  }),
  imageContainer: {
    backgroundColor: "#edeef3",
    //    height: 150
  },
  image: {
    resizeMode: "contain",
    flex: 1,
    height: "100%",
    aspectRatio: 1,
  },

  title: {},
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  discount: {
    color: "#FF003E",
  },
  priceContainer: {
    flexDirection: "row",
  },
  price: {
    fontWeight: "bold",
  },
  currency: {},
});
export default styles;
