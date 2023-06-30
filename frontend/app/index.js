import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import BookCard from "../components/common/bookcards/BookCard";
import usePaginate from "../hooks/usePaginate";
function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error, nextPage, onRefresh, pageEnd } = usePaginate();
  const renderItem = useCallback(
    ({ item }) => <BookCard item={item} />,
    [data]
  );

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
      {!error && (
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
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View>
                {loading ? (
                  <View
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size={50} />
                  </View>
                ) : (
                  <Text> No data yet</Text>
                )}
              </View>
            }
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              // setData([]);
              // fetchData();
              onRefresh();

              setRefreshing(false);
            }}
            onEndReached={() => {
              nextPage();
            }}
            onEndReachedThreshold={0.8}
            // ListFooterComponent={loading && <Text>loading...</Text>}
          />
        </View>
      )}
      {loading && data.length !== 0 && (
        <View style={{ backgroundColor: "transparent" }}>
          <ActivityIndicator size={50} />
        </View>
      )}
      {error && (
        <View style={{ paddingVertical: 50 }}>
          <Text style={{ color: "red", textAlign: "center" }}>
            {error.message}
          </Text>
          <Button title="Retry" onPress={onRefresh} />
          {loading && (
            <View>
              <ActivityIndicator size={50} />
            </View>
          )}
        </View>
      )}
      {pageEnd && <Text>no more data</Text>}
    </SafeAreaView>
  );
}

export default Home;
