import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getAllVideos } from "@/lib/appwrite";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { data: posts, refetch } = useAppwrite(getAllVideos);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, SetRefreshing] = useState(false);

  async function onRefresh() {
    SetRefreshing(true);
    await refetch();
    SetRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-4">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Abdelrahman
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput label="Search for a video topic" />
            <View>
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={posts || []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState label="No videos found" />}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
}
