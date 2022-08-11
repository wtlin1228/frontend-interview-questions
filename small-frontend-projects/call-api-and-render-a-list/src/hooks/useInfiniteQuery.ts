import { useEffect, useMemo, useState } from 'react'

type Cursor = number
type Query<TData> = (cursor?: Cursor) => Promise<TData>

interface Options<TData> {
  getNextPageParam: (lastPage: TData, pages: TData[]) => Cursor
}

export default function useInfiniteQuery<TData>(
  query: Query<TData>,
  options: Options<TData>
) {
  const [pages, setPages] = useState<TData[]>([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false)

  const hasNextPage = useMemo(
    () =>
      pages.length > 0 &&
      options.getNextPageParam(pages[pages.length - 1], pages) !== null,
    [options, pages]
  )

  const fetchNextPage = () => {
    const nextPageParam = options.getNextPageParam(
      pages[pages.length - 1],
      pages
    )

    if (isFetchingNextPage || !hasNextPage) {
      return
    }

    setIsFetchingNextPage(true)
    query(nextPageParam)
      .then((pageData) => {
        setPages((originalPages) => [...originalPages, pageData])
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsFetchingNextPage(false)
      })
  }

  // fetch first page
  useEffect(() => {
    setIsFetching(true)

    query()
      .then((pageData) => {
        setPages([pageData])
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [query])

  return {
    pages,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
