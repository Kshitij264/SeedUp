import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import './DashboardMetrics.css';

export const DashboardMetrics = () => {
  const [stats, setStats] = useState({
    projects: 0,
    proposals: 0,
    loans: 0,
    advice: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsSnap, proposalsSnap, loansSnap, adviceSnap] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'proposals')),
          getDocs(collection(db, 'loans')),
          getDocs(collection(db, 'advice')),
        ]);

        setStats({
          projects: projectsSnap.size,
          proposals: proposalsSnap.size,
          loans: loansSnap.size,
          advice: adviceSnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-metrics">
      <div className="stats-cards">
        <div className="stat-card">
          <h4>Total Projects</h4>
          <p>{loading ? '...' : stats.projects}</p>
        </div>
        <div className="stat-card">
          <h4>Investor Proposals</h4>
          <p>{loading ? '...' : stats.proposals}</p>
        </div>
        <div className="stat-card">
          <h4>Available Loans</h4>
          <p>{loading ? '...' : stats.loans}</p>
        </div>
        <div className="stat-card">
          <h4>Business Advice</h4>
          <p>{loading ? '...' : stats.advice}</p>
        </div>
      </div>
    </div>
  );
};