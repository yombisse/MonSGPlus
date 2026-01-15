// logout.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function deconnexion(navigation) {
  const STORAGE_KEY = "@monsgplus/current_users";
  await AsyncStorage.removeItem(STORAGE_KEY);
  console.log("Utilisateur courant supprimé");
  navigation.navigate("Welcome", { screen: "Login" });

}
