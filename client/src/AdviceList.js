import { useEffect, useState, useCallback } from 'react';
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';

export const AdviceList = () => {
    const [adviceList, setAdviceList] = useState([]);
    
    // A reference to our "advice" collection
    const adviceCollectionRef = collection(db, "advice");

    const getAdviceList = useCallback(async () => {
        try {
            const data = await getDocs(adviceCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setAdviceList(filteredData);
        } catch (err) {
            console.error(err);
        }
    }, [adviceCollectionRef]);

    useEffect(() => {
        getAdviceList();
    }, [getAdviceList]);

    return (
        <div>
            <h2>Business Advice</h2>
            {adviceList.map((advice) => (
                <div key={advice.id} className="card">
                    <h3>Expertise: {advice.expertise}</h3>
                    <p>{advice.information}</p>
                </div>
            ))}
        </div>
    );
};