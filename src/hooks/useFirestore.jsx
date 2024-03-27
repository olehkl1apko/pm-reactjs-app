import { useReducer, useEffect, useState } from "react";
import {
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";

import { projectFirestore, Timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return { success: true, isPending: false, error: null, document: null };
    case "UPDATED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (nameCollection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const collectionRef = collection(projectFirestore, nameCollection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (data) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = Timestamp.fromMillis(new Date().getTime());
      const addedDocument = await setDoc(doc(collectionRef), {
        ...data,
        createdAt,
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const documentRef = doc(projectFirestore, nameCollection, id);
      await deleteDoc(documentRef);
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  // update a document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const documentRef = doc(projectFirestore, nameCollection, id);
      const updatedDocument = await updateDoc(documentRef, updates);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
