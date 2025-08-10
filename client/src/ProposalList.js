import { useEffect, useState, useCallback } from 'react';
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';

export const ProposalList = () => {
    const [proposalList, setProposalList] = useState([]);
    
    // A reference to our "proposals" collection
    const proposalsCollectionRef = collection(db, "proposals");

    const getProposalList = useCallback(async () => {
        try {
            const data = await getDocs(proposalsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setProposalList(filteredData);
        } catch (err) {
            console.error(err);
        }
    }, [proposalsCollectionRef]);

    useEffect(() => {
        getProposalList();
    }, [getProposalList]);

    return (
        <div>
            <h2>Investor Proposals</h2>
            {proposalList.map((proposal) => (
                <div key={proposal.id} className="project-card">
                    <h3>Investor seeks projects in: {proposal.areasOfInterest}</h3>
                    <p>Investment Range: {proposal.investmentRange}</p>
                </div>
            ))}
        </div>
    );
};