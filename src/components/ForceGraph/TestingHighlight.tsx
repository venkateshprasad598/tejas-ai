import React, { useCallback, useMemo, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import genRandomTree from "react-force-graph-2d";

const TestingHighlight = () => {
  const NODE_R = 8;

  const data = useMemo(() => {
    const obj = {
      nodes: [
        {
          id: 1,
          name: "Node 1",
          parentColor: "#735da5",
          childColor: "#e0bcdd",
          collapsed: false,
        },
        {
          id: 2,
          name: "Node 1",
          parentColor: "#735da5",
          childColor: "#e0bcdd",
          collapsed: false,
        },
      ],
      links: [{ source: 1, target: 2 }],
    };

    const updatedNodes = obj.nodes.map((node) => ({ ...node, neighbours: [] }));

    obj.links.forEach((link) => {
      const sourceNode = updatedNodes.find((node) => node.id === link.source);
      const targetNode = updatedNodes.find((node) => node.id === link.target);

      if (sourceNode) {
        sourceNode.neighbours.push(link.target);
      }
      if (targetNode) {
        targetNode.neighbours.push(link.source);
      }
    });

    const result = { ...obj, nodes: updatedNodes };

    return result;
  }, []);

  const [highlightNodes, setHighlightNodes] = useState([]);
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  console.log({ highlightNodes });

  const handleNodeHover = (node) => {
    console.log({ node });
    setHighlightNodes([]);
    highlightLinks.clear();
    if (node.id) {
      console.log("Hey");
      const neighbours = [];
      node.neighbours.forEach((neighbor) => {
        neighbours.push(neighbor);
      });
      console.log({ neighbours });
      setHighlightNodes(neighbours);

      node.links.forEach((link) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    // updateHighlight();
  };

  const handleLinkHover = (link) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  const paintRing = (node, ctx) => {
    // add ring just for highlighted nodes
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
    ctx.fillStyle = node === hoverNode ? "red" : "orange";
    ctx.fill();
  };

  return (
    <ForceGraph2D
      graphData={data}
      nodeRelSize={NODE_R}
      autoPauseRedraw={false}
      linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={(link) =>
        highlightLinks.has(link) ? 4 : 0
      }
      nodeCanvasObjectMode={(node) => {
        // console.log({ node });
        highlightNodes.includes(node.neighbours[0]) ? "before" : undefined;
      }}
      nodeCanvasObject={paintRing}
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
    />
  );
};

export default TestingHighlight;
