import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import { Stack, useRouter } from "expo-router";
import BookCard from "../components/cards/BookCard";
function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const page = data.length;
    if (page > 300) return;
    const nextPage = Array.from(Array(30).keys(), (n) => page + n);
    setData((prev) => [...prev, ...nextPage]);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Screen
        options={{
          headerStyle: {},

          headerTitleAlign: "center",
          headerTitle: "자유톡",
          headerShadowVisible: false,
        }}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          columnWrapperStyle={{
            flexWrap: "wrap",
            columnGap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          contentContainerStyle={
            {
              // alignSelf:  "",
              // alignItems: "flex-start",
              // width: "min(100%,300)",
            }
          }
          numColumns={1000}
          renderItem={({ item }) => <BookCard item={item} />}
          keyExtractor={(item) => item}
          ListEmptyComponent={<Text>No data yet</Text>}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setData([]);
            fetchData();

            setRefreshing(false);
          }}
          onEndReached={() => {
            fetchData();
          }}
          onEndReachedThreshold={0.8}
          ListFooterComponent={<Text>loading...</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
