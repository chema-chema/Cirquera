import { Text, View } from "react-native"
import HomeScreen from "../screens/HomeScreen"
import { Link } from "expo-router"

export default function Home() {
  return (
    <View>
      <Link href="/register">register</Link>
      <Link href="/login">login</Link>
    </View>
  )
}
