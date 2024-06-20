import { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import RelationshipModal from './RelationshipModal';
import { Drawer } from '@mui/material';
import GraphPropertiesDrawer from './GraphPropertiesDrawer';
// import { graphDataObj } from "../../constant/index"

export const graphDataObj = {
    "nodes": [
        {
            "id": "Azad Samaj Party (Kanshiram)",
            "type": "Organization",
            "properties": {}
        },
        {
            "id": "Chander Shekhar Azad @ Ravan",
            "type": "Person",
            "properties": {
                "Role": "Leader"
            }
        },
        {
            "id": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "Event",
            "properties": {
                "Start_Time": "1420 Hrs.",
                "End_Time": "1700 Hrs."
            }
        },
        {
            "id": "Dr. Baba Bhimrao Ambedkar International",
            "type": "Start_Venue",
            "properties": {}
        },
        {
            "id": "Connaught place outer circle",
            "type": "Route",
            "properties": {}
        },
        {
            "id": "Panchkuia Road",
            "type": "Route",
            "properties": {}
        },
        {
            "id": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
            "type": "End_Venue",
            "properties": {}
        },
        {
            "id": "Bhima Koregaon violence",
            "type": "Reason",
            "properties": {}
        },
        {
            "id": "Chandra Gupta Maurya",
            "type": "Person",
            "properties": {
                "Role": "Organizer",
                "Contact": "9958332010, 8459088950"
            }
        },
        {
            "id": "Azad Samaj Party",
            "type": "Organization",
            "properties": {
                "Political_Affiliation": "Yes"
            }
        },
        {
            "id": "11 Bhikuram Jain Marg, Rajpur Road, Civil Line, Delhi-54",
            "type": "Office_Address",
            "properties": {}
        },
        {
            "id": "15 Janpath New Delhi",
            "type": "Start_Location",
            "properties": {}
        },
        // {
        //     "id": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
        //     "type": "End_Location",
        //     "properties": {}
        // },
        {
            "id": "3-4 KMs",
            "type": "Distance",
            "properties": {}
        },
        {
            "id": "1 band, 1 rath, 3 cars",
            "type": "Transportation",
            "properties": {}
        },
        {
            "id": "206^(th) anniversary",
            "type": "Nature_of_event",
            "properties": {}
        }
    ],
    "relationships": [
        {
            "source": "Chander Shekhar Azad @ Ravan",
            "target": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "ORGANIZER"
        },
        {
            "source": "Azad Samaj Party (Kanshiram)",
            "target": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "ORGANISED_BY"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Dr. Baba Bhimrao Ambedkar International",
            "type": "STARTS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Connaught place outer circle",
            "type": "ROUTE"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Panchkuia Road",
            "type": "ROUTE"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
            "type": "ENDS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Bhima Koregaon violence",
            "type": "PURPOSE"
        },
        {
            "source": "Chandra Gupta Maurya",
            "target": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "type": "ORGANIZER"
        },
        {
            "source": "Azad Samaj Party",
            "target": "Chandra Gupta Maurya",
            "type": "MEMBER_OF"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "11 Bhikuram Jain Marg, Rajpur Road, Civil Line, Delhi-54",
            "type": "OFFICE_ADDRESS"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "15 Janpath New Delhi",
            "type": "STARTS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "Ambedkar Bhawan Rani Jhansi Road, Paharganj",
            "type": "ENDS_AT"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "3-4 KMs",
            "type": "DISTANCE"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "1 band, 1 rath, 3 cars",
            "type": "TRANSPORTATION"
        },
        {
            "source": "Sanvidhan Bachao Yatra/Jagriti Yatra and Shaurya Diwas",
            "target": "206^(th) anniversary",
            "type": "DESCRIPTION"
        }
    ]
}

const initialData = {
    nodes: [
        { id: 1, name: 'Node 1', parentColor: "#735da5", childColor: "#e0bcdd", collapsed: false },
        { id: 2, name: 'Node 1', parentColor: "#735da5", childColor: "#e0bcdd", collapsed: false },
    ],
    links: [{ source: 1, target: 2 }],
};

function ForceGraph() {
    const fgRef = useRef();

    const transformData = (apiResponse) => {
        const colors = ["#fa9d9d", "#f4fa9d", "#9dfad0", " #72fc7f", "#a7e7fa", "#b0b8f7", "#d7dbfa", "#ad8080", "#d391ed", "#feb0ff", "#fa4b4b"]
        let colorIndex = 0
        const objType = {}
        const nodes = apiResponse.nodes.map((nodeData) => {
            // const { node } = nodeData;
            const { id, type, properties } = nodeData;
            if (colorIndex == colors.length) {
                colorIndex = 0
            }

            if (!objType[type]) {
                objType[type] = colors[colorIndex]
                colorIndex++
            }

            return {
                id,
                name: id,
                type,
                properties: properties,
                parentColor: objType[type],
                childColor: "",
                collapsed: false
            };
        });

        const links = apiResponse.relationships.map((linkData) => {
            const { source, target, type } = linkData;
            return {
                source: source,
                target: target,
                type: type
            };
        });

        return { nodes, links };
    };

    const intData = transformData(graphDataObj)

    const [graphData, setGraphData] = useState(intData);
    const [selectedNode, setSelectedNode] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState('');
    const [formValidation, setFormValidation] = useState(false)

    const handleNodeClick = (node) => {
        setSelectedNode(node);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setAction('');
    };

    const handleGoBack = () => {
        setAction('');
        setFormValidation(false)
    }

    const handleSaveRelationship = (relationship) => {
        if (action === 'Add Relationship') {

            if (!relationship?.name || !relationship.description) {
                setFormValidation(true)
                return
            } else {
                setFormValidation(false)
            }

            const colors = ["#6aa84f", "#3d85c6", "#f1c232", " #cc0000", "#e69138", "#7A288A", "#87CEEB", "#FF69B4", "#f2d496"]
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];

            const newNode = {
                id: graphData.nodes.length + 1,
                name: relationship.name,
                description: relationship.description,
                parentColor: selectedNode.childColor,
                parent: selectedNode.id,
                childColor: randomColor,
                collapsed: false
            };

            const newLink = {
                source: selectedNode.id,
                target: newNode.id,
            };

            setGraphData({
                nodes: [...graphData.nodes, newNode],
                links: [...graphData.links, newLink],
            });
        } else if (action === 'Edit Relationship') {
            setGraphData({
                nodes: graphData.nodes.map((node) =>
                    node.id === selectedNode.id ? { ...selectedNode, name: relationship.name, description: relationship.description } : node
                ),
                links: graphData.links
            });
        }
        setModalOpen(false);
        setAction("")
    };


    const handleDeleteRelationship = () => {
        setGraphData({
            nodes: graphData.nodes.filter((node) => node.id !== selectedNode.id),
            links: graphData.links.filter(
                (link) => link.source.id !== selectedNode.id && link.target.id !== selectedNode.id
            ),
        });
        setModalOpen(false);
    };


    const handleExpandCollapse = (node) => {
        const updatedNodes = graphData.nodes.map(n => {
            if (n.parent == node.id) {
                return { ...n, collapsed: !n.collapsed };
            }
            return n;
        });

        setGraphData({ ...graphData, nodes: updatedNodes });
    };


    // const filteredGraphData = {
    //     nodes: graphData.nodes.filter(node => {
    //         // const parent = graphData.nodes.find(n => n.id === node.parent);
    //         // return !parent || !parent.collapsed;
    //         return node.collapsed ? false : true
    //     }),
    //     links: graphData.links.filter(link => {
    //         const sourceNode = graphData.nodes.find(n => n.id === link?.source || n.id === link?.source?.id);
    //         const targetNode = graphData.nodes.find(n => n.id === link?.target || n.id === link?.target?.id);
    //         return !sourceNode.collapsed && !targetNode.collapsed;
    //     }),
    // };

    // const handleExpandCollapse = (node) => {
    //     const updatedNodes = graphData.nodes.map(n => {
    //         if (n.parent === node.id) {
    //             return { ...n, collapsed: !n.collapsed };
    //         }
    //         return n;
    //     });

    //     setGraphData({ ...graphData, nodes: updatedNodes });
    // };




    useEffect(() => {
        const fg = fgRef.current;
        fg.d3Force("link").distance(120)
    }, []);

    function onEngineStop() {
        const fg = fgRef.current;
        fg.zoomToFit(1000, 1000);  //the '1000' presents the changed animation
    }
    return (
        <div>
            <ForceGraph2D
                ref={fgRef}
                // warmupTicks={10}
                // cooldownTime={100}
                // onEngineStop={onEngineStop}

                graphData={graphData}
                nodeLabel="name"
                linkLabel="name"
                onNodeClick={handleNodeClick}
                nodeAutoColorBy={"parentColor"}
                minZoom={2.5}
                maxZoom={10}
                zoom={10}
                height={600}
                showNavInfo={true}
                nodeRelSize={10}
                nodeResolution={10}
                linkResolution={10}
                linkDirectionalArrowLength={6}
                linkDirectionalArrowRelPos={1}
                nodeCanvasObject={(node, ctx) => {
                    const size = 23;
                    const radius = size / 2;
                    const fontSize = 4.5;
                    const nodeNameOffset = 0;
                    const fontWeight = 'bold';

                    if (node.avatar) {
                        const img = new Image();
                        img.src = node.avatar;
                        ctx.save();
                        ctx.beginPath();
                        ctx.ellipse(node.x, node.y, radius, radius, 0, 0, 2 * Math.PI);
                        ctx.clip();
                        ctx.drawImage(img, node.x - radius, node.y - radius, size, size);
                        ctx.restore();

                        ctx.font = `${fontSize}px Open Sans, sans-serif`;
                        ctx.fillStyle = 'black';
                        ctx.textAlign = 'center';
                        ctx.fillText(node.name, node.x, node.y + radius + fontSize + nodeNameOffset);
                    } else {
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                        ctx.fillStyle = node.parentColor;
                        ctx.fill();

                        ctx.font = `${fontWeight} ${fontSize}px Open Sans, sans-serif`;
                        ctx.fillStyle = 'black';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(node.name, node.x, node.y);
                    }

                    // Draw expand/collapse button
                    // const hasChildren = graphData.nodes.some(n => n.parent === node.id);
                    // if (hasChildren) {
                    //     const buttonSize = 10;
                    //     const buttonX = node.x + radius + 5;
                    //     const buttonY = node.y;
                    //     ctx.beginPath();
                    //     ctx.arc(buttonX, buttonY, buttonSize / 2, 0, 2 * Math.PI);
                    //     ctx.fillStyle = node.collapsed ? 'green' : 'red';
                    //     ctx.fill();
                    //     ctx.font = `${fontSize}px Arial`;
                    //     ctx.fillStyle = 'white';
                    //     ctx.textAlign = 'center';
                    //     ctx.textBaseline = 'middle';
                    //     ctx.fillText(node.collapsed ? '+' : '-', buttonX, buttonY);
                    // }
                }}

                linkCanvasObjectMode={() => 'after'}
                linkCanvasObject={(link, ctx, globalScale) => {
                    const MAX_FONT_SIZE = 4;
                    const LABEL_NODE_MARGIN = 4;

                    const start = link.source;
                    const end = link.target;

                    // Calculate the mid point
                    const textPos = Object.assign(...['x', 'y'].map(c => ({
                        [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                    })));

                    const relLink = { x: end.x - start.x, y: end.y - start.y };

                    const linkLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2));

                    // Ignore short links
                    if (linkLength < LABEL_NODE_MARGIN * 2) return;

                    // Estimate fontSize to fit in link length
                    const fontSize = 4
                    const fontWeight = 700

                    ctx.font = `${fontWeight} ${fontSize}px Open Sans, sans-serif`;
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';

                    // Rotate text along link direction
                    const angle = Math.atan2(relLink.y, relLink.x);
                    ctx.save();
                    ctx.translate(textPos.x, textPos.y);
                    ctx.rotate(angle);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(link.type, 0, 0);
                    ctx.restore();
                }}

                onNodeDragEnd={node => {
                    node.fx = node.x;
                    node.fy = node.y;
                }}

            />

            {modalOpen && <GraphPropertiesDrawer
                modalOpen={modalOpen} handleModalClose={handleModalClose}

                selectedNode={selectedNode}
            />}

        </div >
    );
}

export default ForceGraph;