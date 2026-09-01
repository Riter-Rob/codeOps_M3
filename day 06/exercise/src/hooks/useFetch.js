import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setError(null)

    async function fetchData() {
      try {
        const res = await fetch(url, { signal: ctrl.signal })
        if (!res.ok) throw new Error('Could not load data')
        const json = await res.json()
        setData(json)
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => ctrl.abort()
  }, [url])

  return { data, loading, error }
}

export default useFetch
