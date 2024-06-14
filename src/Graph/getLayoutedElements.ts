import ELK from 'elkjs/lib/elk.bundled.js'

const elk = new ELK()

export const getLayoutedElements = (
  nodes: any,
  edges: any,
  options: { [x: string]: string }
) => {
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
  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children
        ? layoutedGraph.children.map((node: any) => ({
            ...node,

            position: {
              x: node.position.x ? node.position.x : node.x,
              y: node.position.y ? node.position.y : node.y
            }
          }))
        : [],

      edges: layoutedGraph.edges as any
    }))
    .catch((e) => console.log(e))
}
