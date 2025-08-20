import { ProjectForm } from '../ProjectForm.js';
import { ProjectList } from '../ProjectList.js';
import { InvestorProposalForm } from '../InvestorProposalForm.js';
import { ProposalList } from '../ProposalList.js';
import { BankerForm } from '../BankerForm.js';
import { LoanList } from '../LoanList.js';
import { BusinessAdvisorForm } from '../BusinessAdvisorForm.js';
import { AdviceList } from '../AdviceList.js';
import { AnimatedPage } from '../AnimatedPage';
import { DashboardMetrics } from '../DashboardMetrics.js';

export const Home = ({ userRole, activeView }) => {

    const renderActiveView = () => {
        switch (activeView) {
            case 'proposals':
                return <ProposalList />;
            case 'loans':
                return <LoanList />;
            case 'advice':
                return <AdviceList />;
            case 'projects':
                return <ProjectList />;
            default:
                return null;
        }
    };

    return (
        <AnimatedPage>
            <div>
                {/* If no view is selected, show the default dashboard */}
                {!activeView && (
                    <>
                        <DashboardMetrics />
                        {userRole === "business_person" && <ProjectForm />}
                        {userRole === "investor" && <InvestorProposalForm />}
                        {userRole === "banker" && <BankerForm />}
                        {userRole === "business_advisor" && <BusinessAdvisorForm />}
                    </>
                )}

                {/* If a view IS selected, show only that list */}
                {activeView && renderActiveView()}
            </div>
        </AnimatedPage>
    );
};