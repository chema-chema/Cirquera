import { Slot, Stack, Tabs } from "expo-router"

export default function Layout() {
  return <Tabs>
    <Tabs.Screen
      name="(home)"
      options={{
        title: "Home",
        headerShown: false,
        tabBarLabel: "Index",
      }}
    />
  </Tabs>
}
