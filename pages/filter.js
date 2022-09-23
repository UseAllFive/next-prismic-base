import { client } from 'lib/prismic'
import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const fetcher = (url) => fetch(url).then((res) => res.json())
const PAGE_SIZE = 3

export default function Filter({ categories }) {
  // Query docs here: https://docs.aws.amazon.com/cloudsearch/latest/developerguide/searching-compound-queries.html
  const [filters, setFilters] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  // Reductive filter: posts contain all selected categories
  // Additive filter: posts contain any of the selected categories
  const [reductive, setReductive] = useState(true)

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => {
      let searchQuery =
        searchTerm === '' ? `matchall` : `(phrase '${searchTerm}')`
      const andOr = reductive ? 'and' : 'or'

      if (filters.length > 0) {
        let catString = ''
        filters.forEach((category) => {
          catString += ` category:'${category}'`
        })
        searchQuery = `(and (phrase '${searchTerm}') (${andOr} ${catString}))`
      }
      return `/api/search?q=${encodeURI(
        searchQuery
      )}&size=${PAGE_SIZE}&page=${index}`
    },
    fetcher,
    { revalidateOnFocus: false }
  )

  // useSWR boilerplate for load more button
  const pages = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  return (
    <>
      <button
        onClick={() => {
          setSearchTerm(``)
          setFilters([])
        }}>
        All
      </button>
      <hr />
      <input
        type="checkbox"
        id="reductive"
        checked={reductive}
        onChange={(event) => {
          setReductive(event.currentTarget.checked)
        }}
      />
      <label htmlFor="reductive">Reductive</label>
      <hr />
      <label htmlFor="search">Search:</label>
      <input
        id="search"
        type="text"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setSearchTerm(event.target.value)
          }
        }}
      />
      <hr />
      {categories &&
        categories.map((category) => {
          {
            return (
              category?.data?.title && (
                <div key={category.uid}>
                  <input
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        if (!filters.includes(event.target.value)) {
                          setFilters((prevFilters) => [
                            ...prevFilters,
                            category?.data?.title,
                          ])
                        }
                      } else {
                        setFilters((prevFilters) =>
                          prevFilters.filter(
                            (item) => item !== category?.data?.title
                          )
                        )
                      }
                    }}
                    id={category.uid}
                    checked={filters.includes(category?.data?.title)}
                    type="checkbox"
                  />
                  <label htmlFor={category.uid}>{category?.data?.title}</label>
                </div>
              )
            )
          }
        })}
      <hr />
      {pages.map((page) => {
        return <p key={page.id}>{page.data?.title}</p>
      })}
      <hr />
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}>
        {isLoadingMore
          ? 'loading...'
          : isReachingEnd
          ? 'no more pages'
          : 'load more'}
      </button>
    </>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const masterRef = await client.getMasterRef()
  const ref = previewData?.ref || masterRef.ref
  // Look up categories
  const categories = await client.getAllByType('category', {
    ref,
  })

  return {
    props: {
      preview,
      categories: categories ?? null,
    },
    revalidate: 60,
  }
}
