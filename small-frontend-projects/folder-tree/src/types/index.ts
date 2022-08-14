export interface TFolderContent {
  name: string
}
export interface TFolderNode {
  type: 'folder'
  content: TFolderContent
  children: (TFileNode | TFolderNode)[]
}

export type FileContentType = 'jpg' | 'txt'
export interface TFileContent {
  name: string
  type: FileContentType
}
export interface TFileNode {
  type: 'file'
  content: TFileContent
}
