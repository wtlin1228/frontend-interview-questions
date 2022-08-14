import { useState } from 'react'
import { TFolderNode } from '../types'
import Row from './Row'

const ToggleButton = ({
  isOpened,
  onClick,
}: {
  isOpened: boolean
  onClick: () => void
}) => {
  return (
    <button style={{ cursor: 'pointer' }} onClick={onClick}>
      {isOpened ? '-' : '+'}
    </button>
  )
}

export default function Folder({ folder }: { folder: TFolderNode }) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Row
      startArea={
        <ToggleButton
          isOpened={isOpened}
          onClick={() => setIsOpened(!isOpened)}
        />
      }
      name={folder.content.name}
    >
      {isOpened &&
        folder.children.map((node) => {
          if (node.type === 'file') {
            return <Row name={node.content.name} />
          }
          return <Folder folder={node} />
        })}
    </Row>
  )
}
