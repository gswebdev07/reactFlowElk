import { useEffect } from 'react'
import Graph from 'graphology'
import { SigmaContainer, useLoadGraph } from '@react-sigma/core'
import '@react-sigma/core/lib/react-sigma.min.css'
import { transformedData } from '../data copy'
import { useLayoutNoverlap } from '@react-sigma/layout-noverlap'

const sigmaStyle = { height: '500px', width: '500px' }

export const LoadGraph = () => {
  const loadGraph = useLoadGraph()
  const nodes = transformedData.transformedNodes.map((el) => {
    return { id: el.id, label: el.id, x: 0, y: 0 }
  })
  const edges = transformedData.transformedEdges.map((el) => {
    return { id: el.id, source: el.source, target: el.target }
  })
  console.log(nodes)
  useEffect(() => {
    const graph = new Graph({ multi: true })
    graph.addNode('first', {
      x: 0,
      y: 0,
      size: 15,
      label: 'My first node',
      color: '#FA4F40'
    })
    loadGraph(graph)
  }, [loadGraph])

  return null
}
export const DisplayGraph = () => {
  return (
    <SigmaContainer style={sigmaStyle}>
      <LoadGraph />
    </SigmaContainer>
  )
}
