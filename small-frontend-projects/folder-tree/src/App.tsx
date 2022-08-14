import { data } from './data'
import Folder from './components/Folder'

function App() {
  return (
    <div>
      {data.map((folder) => (
        <Folder folder={folder} />
      ))}
    </div>
  )
}

export default App
