import { icons } from "@/constants";
import { VideoView, useVideoPlayer } from "expo-video";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Models } from "react-native-appwrite";

export type VideoCardProps = {
  video: Models.Document;
};
export default function VideoCard({
  video: {
    title,
    prompt,
    thumbnail,
    video,
    users: { avatarUrl: avatar, username: creator },
  },
}: VideoCardProps) {
  const [play, setPlay] = useState(false);
  const ref = useRef(null);
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
  });

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <VideoView
          ref={ref}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12,
            marginTop: 12,
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
