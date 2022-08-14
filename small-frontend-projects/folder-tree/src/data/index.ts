import type { TFolderNode } from '../types'

export const data: TFolderNode[] = [
  {
    type: 'folder',
    content: {
      name: 'favorite',
    },
    children: [
      {
        type: 'folder',
        content: { name: 'cute' },
        children: [
          {
            type: 'file',
            content: {
              name: 'Bulbasaur',
              type: 'jpg',
            },
          },
          {
            type: 'file',
            content: {
              name: 'Charmander',
              type: 'jpg',
            },
          },
          {
            type: 'file',
            content: {
              name: 'Squirtle',
              type: 'jpg',
            },
          },
        ],
      },
      {
        type: 'folder',
        content: { name: 'strong' },
        children: [
          {
            type: 'file',
            content: {
              name: 'Venusaur',
              type: 'jpg',
            },
          },
          {
            type: 'file',
            content: {
              name: 'Charizard',
              type: 'jpg',
            },
          },
          {
            type: 'file',
            content: {
              name: 'Blastoise',
              type: 'jpg',
            },
          },
        ],
      },
    ],
  },
]
