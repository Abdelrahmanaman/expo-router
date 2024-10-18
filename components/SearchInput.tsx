import { Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from "react-native";

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function SearchInput({
  label,
  error,
  ...props
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View className="bg-black-100 w-full rounded-2xl  h-12 ">
      <TextInput
        placeholder={label}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`bg-white placeholder:-translate-y-4 px-3 text-white w-full h-full rounded-2xl bg-transparent text-base ${
          focused ? "border border-secondary-200" : ""
        }`}
      />

      <TouchableOpacity className="absolute right-3 top-2   p-1">
        <Search
          className={`w-4 h-4  ${focused ? "text-secondary-200" : "text-gray-400"}`}
        />
      </TouchableOpacity>
    </View>
  );
}
