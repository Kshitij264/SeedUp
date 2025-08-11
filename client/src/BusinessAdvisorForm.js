import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from 'react-hot-toast';

export const BusinessAdvisorForm = () => {
  const [expertise, setExpertise] = useState("");
  const [info, setInfo] = useState("");

  // A reference to a NEW collection called "advice"
  const adviceCollectionRef = collection(db, "advice");

  const onSubmitAdvice = async () => {
    if (!expertise || !info) {
      toast.error("Please fill out all fields.");
      return;
    }
    try {
      await addDoc(adviceCollectionRef, {
        expertise: expertise,
        information: info,
        advisorId: auth.currentUser.uid,
      });
      setExpertise("");
      setInfo("");
      toast.success("Information posted successfully!");
    } catch (err) {
      console.error("Error posting information:", err);
      toast.error("There was an error posting your information.");
    }
  };

  return (
    <div className="form-container">
      <h3>Post Business Advice & Information</h3>
      <p>Share your knowledge with entrepreneurs.</p>
      <input
        placeholder="Area of Expertise (e.g., Marketing, Finance)"
        value={expertise}
        onChange={(e) => setExpertise(e.target.value)}
      />
      <textarea
        placeholder="Information or Advice..."
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      />
      <button onClick={onSubmitAdvice}>Post Information</button>
    </div>
  );
};