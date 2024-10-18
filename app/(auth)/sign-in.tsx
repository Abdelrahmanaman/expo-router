import CustomButton from "@/components/CustomButton";
import FormFields from "@/components/FormFields";
import { images } from "@/constants";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (key: keyof FormData, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  async function handleSubmit() {
    if (!form.password || !form.email) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    setIsLoading((prev) => !prev);
    try {
      await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoading((prev) => !prev);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" min-h-[70vh] justify-center items-center px-2">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl font-semibold text-white my-4">
            Log in to Aora
          </Text>

          <FormFields
            value={form.email}
            keyboardType="email-address"
            onChangeText={(value) => handleChange("email", value)}
            label="Email"
          />
          <FormFields
            onChangeText={(value) => handleChange("password", value)}
            value={form.password}
            label="Password"
          />
          <CustomButton
            isLoading={isLoading}
            onPress={handleSubmit}
            className="w-[350px] my-3 text-red-500"
          >
            Sign in
          </CustomButton>
          <View className="flex-row pt-5 gap-2 justify-center items-center">
            <Text className="text-gray-100 text-lg font-pregular">
              Don't have an account?
            </Text>
            <Link className="font-psemibold text-secondary" href={"/sign-up"}>
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
