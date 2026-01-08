import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY='@monsgplus/members';
export async function getMembers() {
    try {
        const json=await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json): [];
        
    } catch (error) {
        console.warn('getMembers error',error);
        return [];
    }
}

async function setMembers(list) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(list));
        
    } catch (error) {
        console.warn("setMembers error",error);
    } 
}
// function create member
export async function addMember(nom,prenom,filiere,contact,addresse,statut) {
    const list=await getMembers();
    const newMember={
        id: Date.now().toString(),
        nom,
        prenom,
        filiere,
        contact,
        addresse,
        statut,
    };
    const updated=[newMember, ...list];
    await setMembers(updated);
    return newMember;
}
// function update member

export async function updateMember(id,patch) {
    const list= await getMembers();
    const updated= list.map(m=>(m.id===id ? {...m, ...patch}:m));
    await setMembers(updated);
    return updated.find(m=>m.id===id);
}

// function delete

export async function deleteMember(id) {
    const list= await getMembers();
    const updated=list.filter(m=>(m.id!==id));
    await setMembers(updated);
    return true;
    
}

// function delete all

export async function clearMembers() {
    await setMembers([]);
}