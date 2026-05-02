import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, createContext, useContext } from "react";
import { Id } from "./convex/_generated/dataModel";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import TodoScreen from "./screens/TodoScreen";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export const AuthContext = createContext<{
  setUserId: (id: Id<"users">) => void;
}>({ setUserId: () => {} });

const RootStack = createNativeStackNavigator({
  initialRouteName: "Login",
  screenOptions: { headerShown: false },
  screens: {
    Login: LoginScreen,
    Signup: SignupScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  return (
    <ConvexProvider client={convex}>
      <AuthContext.Provider value={{ setUserId }}>
        {userId ? (
          <TodoScreen userId={userId} />
        ) : (
          <Navigation />
        )}
      </AuthContext.Provider>
    </ConvexProvider>
  );
}