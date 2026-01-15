import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@monsgplus/currentUser";

export function useCurrentUser({navigation}) {
  const [user, setUser] = useState(null);
  const [erreur, setErreur] = useState("");

  async function loadCurrentUser() {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        setUser(JSON.parse(json));
      }
    } catch (error) {
      setErreur(error.message);
    }
  }

  useEffect(() => {
    loadCurrentUser();
    if (navigation) {
      const reload = navigation.addListener("focus", loadCurrentUser);
      return reload;
    }
  }, [navigation]);

  return { user, erreur };
}
