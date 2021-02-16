import firebase from 'firebase/app'
import 'firebase/storage'
import { upload } from './upload'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBl5AS71axae_v816LjNhYi5avQEzcxsak',
    authDomain: 'upload-files-91645.firebaseapp.com',
    projectId: 'upload-files-91645',
    storageBucket: 'upload-files-91645.appspot.com',
    messagingSenderId: '1074153524015',
    appId: '1:1074153524015:web:160fe3b90cb10e6ae22fda',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', 'jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on(
                'state_changed',
                (snapshot) => {
                    const precentage =
                        (
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        ).toFixed(0) + '%'

                    const block = blocks[index].querySelector(
                        '.preview-info-progress'
                    )

                    block.textContent = precentage
                    block.style.width = precentage
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    task.snapshot.ref
                        .getDownloadURL()
                        .then((url) => console.log('url', url))
                }
            )
        })
    },
})
