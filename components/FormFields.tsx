import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from "react-native";

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, ...props }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handelPassword() {
    setShowPassword((prev) => !prev);
  }
  return (
    <View className="space-y-2 mb-4 w-full px-2">
      <Text className="text-base pl-1 text-gray-100 font-medium">{label}</Text>
      <View className="bg-black-100 w-full rounded-2xl  h-12 ">
        <TextInput
          {...props}
          className="bg-white focus:border  focus:border-secondary-200 px-3 text-white  w-full h-full relative  rounded-2xl bg-transparent  text-base"
          secureTextEntry={label === "Password" && !showPassword}
        />
        {label === "Password" && (
          <TouchableOpacity
            className="absolute right-3 top-2  p-1"
            onPress={handelPassword}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-gray-400" />
            ) : (
              <Eye className="w-4 h-4 text-gray-200" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
}
