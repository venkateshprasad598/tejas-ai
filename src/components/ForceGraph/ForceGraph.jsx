import React, { useLayoutEffect } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { graphDataObjEx } from "../../constant/index";
import GraphPropertiesDrawer from './GraphPropertiesDrawer';
import axios from 'axios';
import { debounce } from 'lodash';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import "./ForceGraph.css"
import { showMoreData } from '../../constant';
import { Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import ShowMoreGraph from './ShowMoreGraph';

const initialData = {
    nodes: [
        { id: 1, name: 'Node 1', parentColor: "#735da5", childColor: "#e0bcdd", collapsed: false },
        { id: 2, name: 'Node 1', parentColor: "#735da5", childColor: "#e0bcdd", collapsed: false },
    ],
    links: [{ source: 1, target: 2 }],
};

function ForceGraph() {
    const fgRef = useRef();



    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [graphDataLoading, setGraphDataLoading] = useState({
        loading: false,
        error: false
    });
    const [intGraphData, setIntGraphData] = useState({ nodes: [], links: [] });

    const [selectedNode, setSelectedNode] = useState(null);
    const [action, setAction] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [openShowMoreModal, setopenShowMoreModal] = useState(false);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const graphRef = useRef();
    const [openOptions, setOpenOptions] = useState();
    const [menuPosition, setMenuPosition] = useState();
    const [isInitialRender, setisInitialRender] = useState(true);


    const [uniqueLabels, setUniqueLabels] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [isRefGiven, setRefGiven] = useState(false)
    const [colorObjs, setColorObjs] = useState({})
    const [colorCount, setColorCount] = useState(0)


    const transformData = (apiResponse) => {

        const colors = ["#fa9d9d", "#f4fa9d", "#9dfad0", " #72fc7f", "#a7e7fa", "#b0b8f7", "#d7dbfa", "#ad8080", "#d391ed", "#feb0ff", "#fa4b4b"]
        let colorIndex = colorCount
        const uniqueLabels = []
        const objType = {}



        const nodes = apiResponse.nodes.map((nodeData) => {
            const { id, label, properties } = nodeData;
            if (colorIndex == colors.length) {
                colorIndex = 0
            }

            if (label?.[0] && !objType[label?.[0]] && !uniqueLabels?.includes(label?.[0])) {
                objType[label[0]] = colors[colorIndex]
                colorIndex++
                uniqueLabels.push(label[0])
            }

            // delete properties["id"]
            setColorCount(colorIndex)
            return {
                id,
                name: properties?.id || "",
                // type,
                properties: properties,
                parentColor: objType[label?.[0]] || "black",
                childColor: "",
                collapsed: false,
                label: label?.[0] || ""
            };
        });

        const links = apiResponse.relationships

        return { nodes, links, uniqueLabels, objType };
    };
    const handleNodeClick = (node) => {

        if (fgRef?.current && !isRefGiven) {
            fgRef.current.d3Force('link').distance(120); // Increase the link distance
            setRefGiven(true)
        }

        setopenShowMoreModal(true)
        setSelectedNode(node);
    };

    const handleClose = () => {
        setopenShowMoreModal(false)
    }

    const handleShowMore = () => {
        setopenShowMoreModal(false)
        handleShowMoreNodes(selectedNode)
    }

    const handleInfo = () => {
        setopenShowMoreModal(false)
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setAction('');
    };

    const handleCheckboxChange = (label) => {


        const prevLabels = selectedLabels



        const selectedNewLabels = prevLabels.includes(label)
            ? prevLabels.filter(l => l !== label)
            : [...prevLabels, label]


        const filteredGraphData = intGraphData.nodes.filter(node => selectedNewLabels.includes(node.label));
        setSelectedLabels(selectedNewLabels);
        setGraphData({ ...graphData, nodes: filteredGraphData })
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

        return { connectedNodes, connectedLinks };
    };

    const debouncedSearch = useCallback(
        debounce(async (term) => {
            setisInitialRender(false)
            setGraphDataLoading({
                loading: true,
                error: false
            })
            try {
                const response = await axios.get(`https://152.52.105.186:8050/search-by-keyword?keyword_val=${term}`);
                if (response?.status == 200) {
                    const responseArr = response?.data || { nodes: [], relationships: [] }
                    const searchedDataRes = transformData(responseArr)
                    const initUniqueLabels = searchedDataRes?.uniqueLabels
                    const intColorObjs = searchedDataRes?.objType || {}

                    console.log({ searchedDataRes, initUniqueLabels })

                    const searchedData = { nodes: searchedDataRes?.nodes, links: searchedDataRes?.links }

                    setIntGraphData(searchedData)
                    setGraphData(searchedData)

                    setSelectedLabels(initUniqueLabels)
                    setUniqueLabels(initUniqueLabels)
                    setColorObjs(intColorObjs)

                    setGraphDataLoading({
                        loading: false,
                        error: false
                    })
                } else {
                    setGraphDataLoading({
                        loading: false,
                        error: true
                    })
                }
                // setGraphData(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setGraphDataLoading({
                    loading: false,
                    error: true
                })
            }
        }, 300),
        []
    );

    const handleShowMoreNodes = async (node) => {

        const label = node?.label || ""
        const id = node?.id || ""

        if (!label || !id) return
        try {
            const response = await axios.get(`https://152.52.105.186:8050/get-on-click?id=${id}&label=${label}`);

            if (response?.status == 200) {
                const responseArr = response?.data
                console.log({ responseArr })
                const searchedData = transformData(responseArr)

                console.log({ searchedData: searchedData?.nodes })
                const removeSelectedNode = searchedData?.nodes?.filter(data => data?.id !== id)

                const newInitUniqueLabels = searchedData?.uniqueLabels || []
                const intColorObjs = searchedData?.objType || {}


                const initUniqueLabels = newInitUniqueLabels?.filter((data) => !uniqueLabels.includes(data))
                const newGraphData = {
                    nodes: [...graphData.nodes, ...removeSelectedNode],
                    links: [...graphData.links, ...searchedData.links]
                }
                setGraphData(newGraphData);
                setIntGraphData(newGraphData)

                setSelectedLabels([...selectedLabels, ...initUniqueLabels])
                setUniqueLabels([...uniqueLabels, ...initUniqueLabels])
                setColorObjs({ ...colorObjs, ...intColorObjs })

            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }


    }
    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const fg = fgRef.current;
        console.log({ fg })
        term?.trim()?.length && debouncedSearch(term);
    };

    // useEffect(() => {
    //     const filteredGraphData = intGraphData.nodes.filter(node => selectedLabels.includes(node.label));
    //     console.log({ filteredGraphData })
    //     setGraphData({ ...graphData, nodes: filteredGraphData })
    // }, [selectedLabels])



    useLayoutEffect(() => {
        console.log({ isInitialRender })

    }, [isInitialRender]);


    console.log({ uniqueLabels, selectedLabels })


    return (
        <div>
            <div className='forceGraph-container'>
                {isInitialRender ? <div className="demo-container">
                    <span className="app-title">TEJIS.AI</span>
                    <p className="description">An AI platform that serves police and intelligence agencies.</p>
                </div> : graphDataLoading?.loading ? <Stack spacing={1} className="loader">
                    <Skeleton variant="rectangular" width={"80%"} height={60} />
                    <Skeleton variant="rounded" width={"80%"} height={60} />
                    <Skeleton variant="rounded" width={"80%"} height={60} />
                    <Skeleton variant="rounded" width={"80%"} height={60} />
                    <Skeleton variant="rounded" width={"80%"} height={60} />
                    <Skeleton variant="rounded" width={"80%"} height={60} />
                    <Skeleton variant="rounded" width={"80%"} height={60} />
                </Stack>
                    : graphDataLoading?.error ?
                        <div className='demo-container'>Something Went Wrong</div>
                        : <ForceGraph2D
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
                                    ctx.fillText(node.name, node.x, node.y + radius + fontSize + nodeNameOffset);
                                } else {
                                    ctx.beginPath();
                                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                                    ctx.fillStyle = node.parentColor;
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
                            linkCanvasObject={(link, ctx) => {
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

                        />}

                <div className='forceGraph-search-input'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search..."
                        style={{ marginBottom: '10px' }}
                        className='search-input'
                    />
                </div>

                {uniqueLabels?.length ? <div className='forceGraph-unique-labels'>
                    {uniqueLabels.map(label => (
                        <label key={label}>
                            <input
                                type="checkbox"
                                checked={selectedLabels.includes(label)}
                                onChange={() => handleCheckboxChange(label)}
                            />
                            {label}
                            <span style={{
                                height: "10px", width: "30px", backgroundColor: colorObjs[label],
                                display: 'inline-block',
                                marginRight: '5px',
                                marginLeft: '5px'

                            }}></span>
                        </label>
                    ))}
                </div> : null}
            </div>

            {modalOpen && <GraphPropertiesDrawer
                modalOpen={modalOpen} handleModalClose={handleModalClose}

                selectedNode={selectedNode}
            />}

            {openShowMoreModal &&

                <ShowMoreGraph
                    openShowMoreModal={openShowMoreModal}
                    handleClose={handleClose}
                    handleShowMore={handleShowMore}
                    handleInfo={handleInfo}
                    node={selectedNode}

                />
            }
        </div >
    );
}

export default ForceGraph;

// <Menu
//     id="demo-positioned-menu"
//     aria-labelledby="demo-positioned-button"
//     anchorEl={openOptions}
//     open={Boolean(openOptions)}
//     onClose={() => setOpenOptions(null)}
//     anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'left',
//     }}
//     transformOrigin={{
//         vertical: 'top',
//         horizontal: 'left',
//     }}
//     style={{
//         position: "absolute",
//         left: menuPosition?.x,
//         top: menuPosition?.y,
//     }}
// >
//     <MenuItem onClick={() => { }}>Profile</MenuItem>
//     <MenuItem onClick={() => { }}>My account</MenuItem>
//     <MenuItem onClick={() => { }}>Logout</MenuItem>
// </Menu>