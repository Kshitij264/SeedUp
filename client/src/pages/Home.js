import { ProjectForm } from '../ProjectForm.js';
import { ProjectList } from '../ProjectList.js';
import { InvestorProposalForm } from '../InvestorProposalForm.js';
import { ProposalList } from '../ProposalList.js';
import { BankerForm } from '../BankerForm.js';
import { LoanList } from '../LoanList.js';
import { BusinessAdvisorForm } from '../BusinessAdvisorForm.js';
import { AdviceList } from '../AdviceList.js';
import { AnimatedPage } from '../AnimatedPage';

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
            default:
                return <ProjectList />;
        }
    };

    return (
        <AnimatedPage>
            <div>
                {userRole === "business_person" && <ProjectForm />}
                {userRole === "investor" && <InvestorProposalForm />}
                {userRole === "banker" && <BankerForm />}
                {userRole === "business_advisor" && <BusinessAdvisorForm />}

                <hr />
                
                <div className="view-content">
                    {renderActiveView()}
                </div>
            </div>
        </AnimatedPage>
    );
};