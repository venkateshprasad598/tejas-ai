import { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { graphDataObj } from "../../constant/index";
import GraphPropertiesDrawer from './GraphPropertiesDrawer';
import "./ForceGraph.css"

const initialData = {
    nodes: [
        { id: 1, name: 'Node 1', parentColor: "#735da5", childColor: "#e0bcdd", collapsed: false },
        { id: 2, name: 'Node 1', parentColor: "#735da5", childColor: "#e0bcdd", collapsed: false },
    ],
    links: [{ source: 1, target: 2 }],
};

function ForceGraph() {
    const fgRef = useRef();
    const uniqueLabels = []
    const objType = {}

    const transformData = (data) => {

        const colors = ["#fa9d9d", "#f4fa9d", "#9dfad0", " #72fc7f", "#a7e7fa", "#b0b8f7", "#d7dbfa", "#ad8080", "#d391ed", "#feb0ff", "#fa4b4b"]
        let colorIndex = 0



        const nodesRes = data?.nodes.map(node => {
            const newLabel = node.label.filter(label => label !== '__Entity__');
            return {
                ...node,
                label: newLabel[0]
            };
        });

        const apiResponse = { ...data, nodes: nodesRes }

        const nodes = apiResponse.nodes.map((nodeData) => {
            // const { node } = nodeData;
            const { id, label, properties } = nodeData;
            if (colorIndex == colors.length) {
                colorIndex = 0
            }

            if (!objType[label]) {
                objType[label] = colors[colorIndex]
                colorIndex++
                uniqueLabels.push(label)
            }

            // delete properties["id"]

            return {
                id,
                name: properties?.id || "",
                // type,
                properties: properties,
                parentColor: objType[label],
                childColor: "",
                collapsed: false,
                label: label
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

    console.log({ uniqueLabels })

    const [graphData, setGraphData] = useState(intData);
    const [intGraphData, setIntGraphData] = useState(intData);
    const [selectedLabels, setSelectedLabels] = useState(uniqueLabels);


    const [selectedNode, setSelectedNode] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState('');
    const [hoveredNode, setHoveredNode] = useState(null);


    const handleNodeClick = (node) => {
        setSelectedNode(node);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setAction('');
    };

    const handleCheckboxChange = (label) => {
        setSelectedLabels(prev =>
            prev.includes(label)
                ? prev.filter(l => l !== label)
                : [...prev, label]
        );
    };

    const getConnectedNodesAndLinks = (nodeId) => {
        const connectedNodes = new Set();
        const connectedLinks = new Set();

        graphData.links.forEach(link => {
            if (link.source.id === nodeId || link.source === nodeId) {
                connectedNodes.add(link.target.id || link.target);
                connectedLinks.add(link);
            }
            if (link.target.id === nodeId || link.target === nodeId) {
                connectedNodes.add(link.source.id || link.source);
                connectedLinks.add(link);
            }
        });

        console.log({ connectedLinks })
        return { connectedNodes, connectedLinks };
    };

    useEffect(() => {
        // if (selectedLabels.length === 0) {
        //     setGraphData(intGraphData)
        //     return
        // }
        const filteredGraphData = intGraphData.nodes.filter(node => selectedLabels.includes(node.label));
        console.log({ filteredGraphData })
        setGraphData({ ...graphData, nodes: filteredGraphData })
    }, [selectedLabels])


    useEffect(() => {
        const fg = fgRef.current;
        fg.d3Force("link").distance(120)
    }, []);


    const getConnectedNodes = (nodeId) => {
        const connectedNodes = new Set();
        graphData.links.forEach(link => {
            if (link.source.id === nodeId) connectedNodes.add(link.target.id);
            if (link.target.id === nodeId) connectedNodes.add(link.source.id);
        });
        return connectedNodes;
    };

    return (
        <div>
            <div className='forceGraph-container'>
                <ForceGraph2D
                    ref={fgRef}
                    graphData={graphData}
                    nodeLabel="name"
                    linkLabel="name"
                    onNodeClick={handleNodeClick}
                    nodeAutoColorBy={"parentColor"}
                    minZoom={0.5}
                    maxZoom={10}
                    zoom={10}
                    // height={600}
                    showNavInfo={true}
                    nodeRelSize={10}
                    nodeResolution={10}
                    linkResolution={10}
                    linkDirectionalArrowLength={6}
                    linkDirectionalArrowRelPos={1}
                    onNodeHover={node => setHoveredNode(node)}
                    nodeCanvasObject={(node, ctx) => {
                        const size = 23;
                        const radius = size / 2;
                        const fontSize = 4.5;
                        const nodeNameOffset = 0;
                        const fontWeight = 'bold';

                        // const isConnected = hoveredNode && (node.id === hoveredNode.id || connectedNodes.has(node.id));

                        const { connectedNodes } = hoveredNode ? getConnectedNodesAndLinks(hoveredNode.id) : { connectedNodes: new Set() };
                        const isConnected = hoveredNode && (node.id === hoveredNode.id || connectedNodes.has(node.id));
                        const isParent = hoveredNode && node.id === hoveredNode.id
                        // const isConnected = hoveredNode && (node.id === hoveredNode.id || getConnectedNodes(hoveredNode.id).has(node.id));
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
                            ctx.fillText(node.name, node.x, noFde.y + radius + fontSize + nodeNameOffset);
                        } else {
                            ctx.beginPath();
                            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                            ctx.fillStyle = isConnected ? 'yellow' : node.parentColor;
                            ctx.fill();

                            if (isConnected) {
                                ctx.strokeStyle = isParent ? "red" : isConnected ? '#a38724' : node.parentColor;
                                ctx.lineWidth = 6;
                                ctx.stroke();
                            }

                            ctx.font = `${fontWeight} ${fontSize}px Open Sans, sans-serif`;
                            ctx.fillStyle = 'black';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(node.name, node.x, node.y);
                        }
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



                    linkColor={(link) => {
                        if (!hoveredNode) return 'rgba(0, 0, 0, 0.2)';
                        const { connectedLinks } = getConnectedNodesAndLinks(hoveredNode.id);
                        return connectedLinks.has(link) ? '#b0aea7' : 'rgba(0, 0, 0, 0.2)';
                    }}
                    linkWidth={(link) => {
                        if (!hoveredNode) return 1;
                        const { connectedLinks } = getConnectedNodesAndLinks(hoveredNode.id);
                        return connectedLinks.has(link) ? 4 : 1;
                    }}

                />

                <div className='forceGraph-unique-labels'>
                    {uniqueLabels.map(label => (
                        <label key={label}>
                            <input
                                type="checkbox"
                                checked={selectedLabels.includes(label)}
                                onChange={() => handleCheckboxChange(label)}
                            />
                            {label}
                            <span style={{
                                height: "10px", width: "30px", backgroundColor: objType[label],
                                display: 'inline-block',
                                marginRight: '5px',
                                marginLeft: '5px'

                            }}></span>
                        </label>
                    ))}
                </div>
            </div>

            {modalOpen && <GraphPropertiesDrawer
                modalOpen={modalOpen} handleModalClose={handleModalClose}

                selectedNode={selectedNode}
            />}

        </div >
    );
}

export default ForceGraph;