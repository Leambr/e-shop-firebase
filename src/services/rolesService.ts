import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export const getRoleByUserId = async (userId: string): Promise<string> => {
    const q = query(collection(db, "roles"), where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    let role = '';
    querySnapshot.forEach((doc) => {
        role = doc.data().role;
    });
    return role;
};

export const addRole = async (role: string, uid: string) => {
    await addDoc(collection(db, 'roles'), {
        role: role.toLowerCase(),
        user_id: uid,
    });
};