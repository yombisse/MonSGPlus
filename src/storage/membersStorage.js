import AsyncStorage from "@react-native-async-storage/async-storage";


export async function getData(STORAGE_KEY) {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const data = json ? JSON.parse(json) : [];
    return Array.isArray(data) ? data : []; // toujours un tableau
  } catch (error) {
    console.warn('getData error', error);
    return [];
  }
}


async function setData(STORAGE_KEY,list) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(list));
        
    } catch (error) {
        console.warn("setData error",error);
    } 
}
// function create member
export async function addData(STORAGE_KEY, item) {
  const list = await getData(STORAGE_KEY);
  const newItem = {
    id: Date.now().toString(),
    ...item,
  };
  const updated = Array.isArray(list) ? [newItem, ...list] : [newItem];
  await setData(STORAGE_KEY, updated);
  return newItem;
}

// function update member

export async function updateData(STORAGE_KEY,id,patch) {
    const list= await getData(STORAGE_KEY);
    const updated= list.map(m=>(m.id===id ? {...m, ...patch}:m));
    await setData(STORAGE_KEY,updated);
    return updated.find(m=>m.id===id);
}

// function delete

export async function deleteData(STORAGE_KEY,id) {
    const list= await getData(STORAGE_KEY);
    const updated=list.filter(m=>(m.id!==id));
    await setData(STORAGE_KEY,updated);
    return true;
    
}

// function delete all

export async function clearData(STORAGE_KEY) {
    await setData(STORAGE_KEY,[]);
}


