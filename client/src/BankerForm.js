import { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from 'react-hot-toast';

export const BankerForm = () => {
  const [loanType, setLoanType] = useState("");
  const [interestRate, setInterestRate] = useState("");

  // A reference to a NEW collection called "loans"
  const loansCollectionRef = collection(db, "loans");

  const onSubmitLoan = async () => {
    if (!loanType || !interestRate) {
      toast.error("Please fill out all fields.");
      return;
    }
    try {
      await addDoc(loansCollectionRef, {
        loanType: loanType,
        interestRate: interestRate,
        bankerId: auth.currentUser.uid,
      });
      setLoanType("");
      setInterestRate("");
      toast.success("Loan details submitted successfully!");
    } catch (err) {
      console.error("Error submitting loan details:", err);
      toast.error("There was an error submitting your details.");
    }
  };

  return (
    <div className="form-container">
      <h3>Post Available Loan Details</h3>
      <p>Let entrepreneurs know about financing opportunities.</p>
      <input
        placeholder="Type of Loan (e.g., Small Business Loan)"
        value={loanType}
        onChange={(e) => setLoanType(e.target.value)}
      />
      <input
        placeholder="Interest Rate (e.g., Starting at 8.5%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <button onClick={onSubmitLoan}>Submit Loan Details</button>
    </div>
  );
};