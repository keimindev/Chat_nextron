import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const getMateData = async (users) => {
  const auth = getAuth();
  const curUser = auth.currentUser;
  console.log(curUser);
  const mateId = users.filter((user) => user !== curUser.uid);
  const docRef = doc(db, "users", mateId[0]);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export default getMateData;
