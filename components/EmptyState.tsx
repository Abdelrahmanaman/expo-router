import { images } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

export default function EmptyState({ label }: { label: string }) {
  return (
    <View className="px-4 items-center justify-center">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-center  text-gray-100 text-xl font-semibold">
        {label}
      </Text>
      <CustomButton className="my-2" onPress={() => router.push("/create")}>
        Create a new video
      </CustomButton>
    </View>
  );
}
