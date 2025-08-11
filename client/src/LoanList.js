import { useEffect, useState, useCallback } from 'react';
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';

export const LoanList = () => {
    const [loanList, setLoanList] = useState([]);
    
    // A reference to our "loans" collection
    const loansCollectionRef = collection(db, "loans");

    const getLoanList = useCallback(async () => {
        try {
            const data = await getDocs(loansCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setLoanList(filteredData);
        } catch (err) {
            console.error(err);
        }
    }, [loansCollectionRef]);

    useEffect(() => {
        getLoanList();
    }, [getLoanList]);

    return (
        <div>
            <h2>Available Loans</h2>
            {loanList.map((loan) => (
                <div key={loan.id} className="card">
                    <h3>{loan.loanType}</h3>
                    <p>Interest Rate: {loan.interestRate}</p>
                </div>
            ))}
        </div>
    );
};