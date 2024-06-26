import ForceGraph from "../../components/ForceGraph/ForceGraph";
import NodeFlow from "../../components/NodeFlow"
import useDashboard from "../../hooks/useDashboard";

function Dashboard() {

    const {
        nodes,
        edges,
        nodeTypes,
        activeTab,
        handleHeader
    } = useDashboard()


    return (
        <div className="dashboard-container">
            <ForceGraph />
        </div>
    );
}

export default Dashboard;

