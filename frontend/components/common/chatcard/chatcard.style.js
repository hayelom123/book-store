import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatContainer: {},
  firstRow: {},
  msgContainer: { marginLeft: 50 },
  replyContainer: {},
  iconsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  icons: {
    flexDirection: "row",
    paddingRight: 10,
  },
  iconsText: {
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "400",
    color: "#919EB6",
  },
  userRow: {},
  userInfo: { flexDirection: "row", alignItems: "center" },
  name: { marginLeft: 5 },
  time: { color: "#919EB6" },
});

export default styles;
