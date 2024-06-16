import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  useEdgesState,
  useNodesState,
  useReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'

import { transformedData } from './data'

const WorkerGraph: React.FC = () => {
  const { fitView} = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState<any[]>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<any[]>([])
  const workerRef = useRef<Worker>()

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./layout.worker.ts', import.meta.url)
    )
    console.log('Worker initialized:', workerRef.current) // Debug log

    workerRef.current.onmessage = (event: MessageEvent) => {
      console.log('Main thread received message:', event.data) // Debug log

      const { nodes, edges, error } = event.data as {
        nodes: any
        edges: any
        error?: any
      }
      if (error) {
        console.error(error)
      } else {
        setNodes(nodes as any)
        setEdges(edges as any)
      }
    }
    return () => {
      workerRef.current?.terminate()
    }
  }, [])
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
    workerRef.current?.postMessage({ nodes: ns, edges: es, options: opts })
  }, [])
  useLayoutEffect(() => {
    onLayout()
  }, [])
  useEffect(() => {
    setTimeout(() => onFitView(), 150)
  }, [])
  const onFitView = () => {
    fitView({ duration: 800, padding: 0.2 })
  }
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
    />
  )
}

export default WorkerGraph
