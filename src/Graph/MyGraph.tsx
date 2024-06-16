import React, { useCallback, useLayoutEffect } from 'react'
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow'
import { transformedData } from './data'
import { getLayoutedElements } from './getLayoutedElements'
import 'reactflow/dist/style.css'

const MyGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([])
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onLayout = useCallback(() => {
    const opts = {
      'elk.algorithm': 'layered',
      'elk.layered.spacing.nodeNodeBetweenLayers': '150', // Adjust the spacing between layers
      'elk.spacing.nodeNode': '120', // Adjust the spacing between nodes on the same layer
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
      'elk.direction': 'DOWN'
    }
    const ns = transformedData.transformedNodes
    const es = transformedData.transformedEdges
    getLayoutedElements(ns, es, opts).then((graph) => {
      if (graph && 'nodes' in graph && 'edges' in graph) {
        const { nodes: layoutedNodes, edges: layoutedEdges } = graph
        setNodes(layoutedNodes)
        setEdges(layoutedEdges)
      }
    })
  }, [])
  useLayoutEffect(() => {
    onLayout()
  }, [])
  return (
    <ReactFlow
      edges={edges}
      fitView
      maxZoom={1.6}
      minZoom={-Infinity}
      nodes={nodes}
      onConnect={onConnect}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      proOptions={{ account: 'paid-pro', hideAttribution: true }}
    >
      <Controls position={'bottom-right'} showInteractive={false}></Controls>
    </ReactFlow>
  )
}

export default MyGraph
