import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const InvestorProposalForm = () => {
  const [interest, setInterest] = useState("");
  const [range, setRange] = useState("");

  // A reference to a NEW collection called "proposals"
  const proposalsCollectionRef = collection(db, "proposals");

  const onSubmitProposal = async () => {
    if (!interest || !range) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addDoc(proposalsCollectionRef, {
        areasOfInterest: interest,
        investmentRange: range,
        investorId: auth.currentUser.uid,
      });
      setInterest("");
      setRange("");
      alert("Proposal submitted successfully!");
    } catch (err) {
      console.error("Error submitting proposal:", err);
      alert("There was an error submitting your proposal.");
    }
  };

  return (
    <div className="project-card"> {/* We can reuse the same style */}
      <h3>Post Your Investment Proposal</h3>
      <p>Let entrepreneurs know what you're looking for.</p>
      <input
        placeholder="Areas of Interest (e.g., AI, Healthcare, SaaS)"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
      <input
        placeholder="Investment Range (e.g., $10k - $50k)"
        value={range}
        onChange={(e) => setRange(e.target.value)}
      />
      <button onClick={onSubmitProposal}>Submit Proposal</button>
    </div>
  );
};