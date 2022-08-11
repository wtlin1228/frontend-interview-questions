import { memo, useMemo } from 'react'
import Card from './components/Card'
import LoadMoreButton from './components/LoadMoreButton'
import useInfiniteQuery from './hooks/useInfiniteQuery'
import { TPokemon } from './types'

interface TData {
  previousCursor: number
  nextCursor: number
  pokemons: TPokemon[]
}

const fetchPokemon = (cursor = 0) =>
  fetch(`http://localhost:8080/pokedex?limit=35&cursor=${cursor}`)
    .then((res) => res.json())
    .then((x) => x.data)

const MemoCard = memo(Card)

function App() {
  const { pages, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<TData>(
      fetchPokemon,
      useMemo(
        () => ({
          getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        }),
        []
      )
    )

  return (
    <div>
      <div
        style={{
          padding: '0 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          justifyItems: 'center',
          gap: '30px 20px',
        }}
      >
        {pages.map((page) =>
          page.pokemons.map((pokemon) => (
            <MemoCard key={pokemon.id} {...pokemon} />
          ))
        )}
      </div>
      {hasNextPage && <LoadMoreButton handleClick={fetchNextPage} />}
    </div>
  )
}

export default App
