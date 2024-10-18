import { icons } from "@/constants";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useRef, useState } from "react";
import type { ImageStyle, TextStyle, ViewStyle, ViewToken } from "react-native";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import type { CustomAnimation } from "react-native-animatable";
import * as Animatable from "react-native-animatable";
import type { Models } from "react-native-appwrite";

type AnimatedStyle = TextStyle & ViewStyle & ImageStyle;

const zoomIn: CustomAnimation<AnimatedStyle> = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut: CustomAnimation<AnimatedStyle> = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};

type PostProps = {
  posts: Models.Document[];
};
const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: Models.Document;
}) => {
  const [play, setPlay] = useState(false);
  const ref = useRef(null);
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
  });
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          ref={ref}
          style={{
            width: 208,
            height: 288,
            borderRadius: 33,
            marginTop: 12,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default function ({ posts }: PostProps) {
  const [activeItem, setActiveItem] = useState<string>(posts[0]?.$id || "");

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].item) {
      setActiveItem(viewableItems[0].item.$id);
    }
  };

  return (
    <FlatList
      className="py-4 overflow-hidden  w-full"
      data={posts}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
}
