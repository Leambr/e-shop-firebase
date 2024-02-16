import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

export const uploadFile = async (file: File): Promise<string> => {
    const storageRef = ref(storage, 'file/' + file.name);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);
        return fileUrl;
    } catch (e) {
        console.log(e);
        throw new Error('Error uploading file');
    }
};
