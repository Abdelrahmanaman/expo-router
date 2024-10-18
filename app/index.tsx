import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useUser } from "@/contexts/UserContexts";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  const { isLoggedIn, isLoading } = useUser();

  if (!isLoading && !isLoggedIn) {
    return <Redirect href={"/home"} />;
  }
  function handlePress() {
    router.push("/sign-in");
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[300px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless POssibilies with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[80px] h-[150px] absolute -bottom-20 -right-2"
              resizeMode="contain"
            />
          </View>
          <Text className="mt-7 text-gray-300 text-center">
            Where creativity meets innovation: embark on a journey of limiless
            exploration with Aora
          </Text>
          <CustomButton className="mt-4" onPress={handlePress}>
            Continue with Email
          </CustomButton>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
