import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(projectStorage, uploadPath);
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress updates during upload
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading file:", error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // add display AND PHOTO_URL name to user
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            }).catch(() => {
              console.log("An error occurred while profile updating");
            });

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user });

            // create a user document
            const userDocRef = doc(projectFirestore, "users", res.user.uid);
            await setDoc(userDocRef, {
              online: true,
              displayName,
              photoURL: downloadURL,
            });

            setIsPending(false);
            setError(null);
          });
        }
      );

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
