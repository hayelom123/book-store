import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./chatcard.style";
import { Avatar } from "react-native-paper";
import icons from "../../../constants/icons";
import IconButton from "../icon-btn/IconButton";
const ChatCard = () => {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.firstRow}>
        <View style={styles.userInfo}>
          <Avatar.Image size={50} source={icons.avatarSender} />
          <Text style={styles.name}>안녕나응애</Text>
          <Text style={styles.time}>1일전</Text>
        </View>
      </View>
      <View style={styles.msgContainer}>
        <Text>
          어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭 우짤래미님도
          아시겠지만 저도 일반인 몸매 그 이상도 이하도 아니잖아요?! 그런 제가
          기꺼이 도전해봤는데 생각보다 괜찮았어요! 오늘 중으로 라이브 리뷰
          올라온다고 하니 꼭 봐주세용~!
        </Text>

        <View style={styles.iconsContainer}>
          <View style={styles.icons}>
            <IconButton path={icons.heart} />
            <Text style={styles.iconsText}>5</Text>
          </View>
          <View style={styles.icons}>
            <IconButton path={icons.msg} />
            <Text style={styles.iconsText}>5</Text>
          </View>
        </View>
        <View style={styles.replyContainer}>
          <View style={styles.firstRow}>
            <View style={styles.userInfo}>
              <Avatar.Image size={50} source={icons.avatarReply} />
              <Text style={styles.name}>ㅇㅅㅇ</Text>
              <Text style={styles.time}>1일전</Text>
            </View>
          </View>
          <View style={styles.msgContainer}>
            <Text>오 대박! 라이브 리뷰 오늘 올라온대요? 챙겨봐야겠다</Text>
            <View style={styles.iconsContainer}>
              <View style={styles.icons}>
                <IconButton path={icons.heart} />
                <Text style={styles.iconsText}>5</Text>
              </View>
              {/* <View style={styles.icons}>
                <IconButton path={icons.msg} />
                <Text style={styles.iconsText}>5</Text>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatCard;
