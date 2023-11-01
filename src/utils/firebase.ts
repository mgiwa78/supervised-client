import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {UploadResult, getStorage, ref, uploadBytes} from 'firebase/storage'

const config = {
  apiKey: 'AIzaSyDU2AzQSzciR85gy4nZEoQm0g_apBiaQDU',
  authDomain: 'supervised-c4183.firebaseapp.com',
  projectId: 'supervised-c4183',
  storageBucket: 'supervised-c4183.appspot.com',
  messagingSenderId: '48985799089',
  appId: '1:48985799089:web:5bddf764cad9bdf8b92590',
}

const app = initializeApp(config)

const db = getFirestore(app)
const storage = getStorage(app)

export {db, storage}
