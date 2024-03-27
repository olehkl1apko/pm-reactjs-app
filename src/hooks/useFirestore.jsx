import { useReducer, useEffect, useState } from "react";

import { projectFirestore, Timestamp } from "../firebase/config";
import { setDoc, deleteDoc, doc, collection } from "firebase/firestore";

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
        document: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", error: err });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const documentRef = doc(projectFirestore, nameCollection, id);
      const deletedDocument = await deleteDoc(documentRef);
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", error: "could not delete" });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
