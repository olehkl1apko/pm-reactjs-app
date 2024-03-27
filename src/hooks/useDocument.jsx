import { useEffect, useState } from "react";
import { doc } from "firebase/firestore";

import { projectFirestore } from "../firebase/config";

export const useDocument = (nameCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime document data
  useEffect(() => {
    const documentRef = doc(projectFirestore, nameCollection, id);

    const unsubscribe = onSnapshot(
      documentRef,
      (snapshot) => {
        // need to make sure the doc exists & has data
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [nameCollection, id]);

  return { document, error };
};
