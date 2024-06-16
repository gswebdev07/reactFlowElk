import { AnyAaaaRecord } from 'dns'
import ELK from 'elkjs/lib/elk.bundled.js'

const elk = new ELK()

interface LayoutWorkerMessage {
  nodes: any
  edges: any
  options: { [key: string]: string }
}

interface LayoutWorkerResponse {
  nodes: any
  edges: AnyAaaaRecord
  error?: any
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = (event: MessageEvent<LayoutWorkerMessage>) => {
  const { nodes, edges, options } = event.data
  const isHorizontal = options?.['elk.direction'] === 'RIGHT'
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node: any) => ({
      ...node,
      width: node.width ? node.width : 65,
      height: node.height ? node.height : 65,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom'
    })),
    edges: edges as any
  }

  elk
    .layout(graph)
    .then((layoutedGraph) => {
      console.log('Worker layout completed:', layoutedGraph) // Debug log
      const result: LayoutWorkerResponse = {
        nodes: layoutedGraph.children
          ? layoutedGraph.children.map((node: any) => ({
              ...node,
              position: {
                x: node.position?.x ?? node.x,
                y: node.position?.y ?? node.y
              }
            }))
          : [],
        edges: layoutedGraph.edges as any
      }
      postMessage(result)
    })
    .catch((error) => {
      console.error('Worker layout error:', error) // Debug log
      postMessage({ error })
    })
}
