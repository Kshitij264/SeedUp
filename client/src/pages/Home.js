import { ProjectForm } from '../ProjectForm.js';
import { ProjectList } from '../ProjectList.js';
import { InvestorProposalForm } from '../InvestorProposalForm.js';
// --- NEW --- Import the ProposalList component
import { ProposalList } from '../ProposalList.js';

export const Home = ({ userRole }) => {
    return (
        <div>
            {/* If the user is a Business Person, show the project form */}
            {userRole === "business_person" && (
                <>
                    <ProjectForm />
                    <hr />
                </>
            )}

            {/* If the user is an Investor, show the proposal form */}
            {userRole === "investor" && (
                <>
                    <InvestorProposalForm />
                    <hr />
                </>
            )}

            {/* --- NEW --- Display both lists for all users */}
            <ProposalList />
            <hr/>
            <ProjectList />
        </div>
    );
};