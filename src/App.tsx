import './App.css'
import { ReactFlowProvider } from 'reactflow'
import MyGraph from './Graph/MyGraph'

function App() {
  return (
    <div className="App">
      <div style={{ height: '800px' }}>
        <ReactFlowProvider>
          <MyGraph />
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default App
