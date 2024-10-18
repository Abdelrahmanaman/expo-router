import { Loader2 } from "lucide-react-native";
import {
  Text,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";
type customButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
};
export default function CustomButton({
  children,
  isLoading,
  className,
  ...props
}: customButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      disabled={isLoading}
      className={`${isLoading ? "opacity-80" : ""}  w-full md:w-72 bg-secondary rounded-2xl min-h-[62] justify-center items-center `}
    >
      {isLoading ? (
        <View className="flex-row items-center  gap-2 justify-center px-4">
          <Text className="text-lg font-psemibold text-primary">Loading</Text>
          <Loader2 className="w-4 h-4 animate-bounce" />
        </View>
      ) : (
        <Text className="text-lg font-psemibold text-primary">{children}</Text>
      )}
    </TouchableOpacity>
  );
}
