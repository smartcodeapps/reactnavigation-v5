import "react-native-gesture-handler";
import React from "react";
import { Text, View, Button, TextInput } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [name, setName] = React.useState("");
  return (
    <View>
      <Text style={{ fontSize: 24 }}>This is a Home Screen</Text>
      <TextInput
        style={{ margin: 30, fontSize: 21 }}
        placeholder="Please Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button
        title="Go to Detail"
        onPress={() => {
          navigation.navigate("DetailScreen", { name });
        }}
      />
    </View>
  );
}

function DetailScreen({ route, navigation }) {
  const { name } = route.params;
  return (
    <View>
      <Text style={{ fontSize: 24 }}>Welcome {name}</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      />
      <Button
        title="Open PopUp"
        onPress={() => {
          navigation.navigate("MyModal");
        }}
      />
    </View>
  );
}

function ModalScreen(route) {
  return (
    <View style={{ margin: 60 }}>
      <Text style={{ fontSize: 24 }}>Hey am a modal screen!</Text>
      <Button
        title="Close this modal"
        onPress={() => {
          route.navigation.goBack();
        }}
      />
    </View>
  );
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home Screen",
        }}
      />
      <MainStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: "Detail Screen",
          headerRight: () => (
            <Button title={"Done"} onPress={() => alert("Am pressed!")} />
          ),
          headerBackTitle: "Back",
        }}
      />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "tomato",
        },
      }}
    >
      <RootStack.Screen name="MainStack" component={MainStackScreen} />
      <RootStack.Screen
        name="MyModal"
        component={ModalScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "skyblue",
          },
        }}
      />
    </RootStack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ margin: 60 }}>
      <Text style={{ fontSize: 24 }}>This is a Settings Tab</Text>
    </View>
  );
}

function TabNavigation() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name == "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={RootStackScreen} />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarBadge: 3,
        }}
      />
    </Tabs.Navigator>
  );
}

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function FirstItem({ navigation }) {
  return (
    <View style={{ margin: 60 }}>
      <Text style={{ fontSize: 24 }}>This is First Item screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Button
        title="Go to Second Item"
        onPress={() => {
          navigation.navigate("SecondItem");
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="FirstItem" component={FirstItem} />
        <Drawer.Screen name="SecondItem" component={TabNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
