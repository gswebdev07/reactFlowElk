import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ReactFlowProvider } from 'reactflow'
import MyGraph from './Graph/MyGraph'
import WorkerGraph from './Graph/WorkerGraph'

const router = createBrowserRouter([
  {
    path: '/',
    element: <></>
  },
  {
    path: '/currentVersion',
    element: (
      <ReactFlowProvider>
        <MyGraph />
      </ReactFlowProvider>
    )
  },
  {
    path: '/workerLoader',
    element: (
      <ReactFlowProvider>
        <WorkerGraph />
      </ReactFlowProvider>
    )
  }
])
function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/currentVersion">Current</a>
          </li>
          <li>
            <a href="/workerLoader">Worker Loader</a>
          </li>
        </ul>
      </nav>
      <div
        style={{ height: '700px', border: '10px solid #777', margin: '10px' }}
      >
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
