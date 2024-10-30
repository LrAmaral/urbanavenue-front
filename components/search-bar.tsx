'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleSearch = async (query: string) => {
      if (!query) {
        setData(null)
        return
      }

      setLoading(true)
      setError(null)
      setData(null)

      try {
        // const products = await searchProductsAction(query)
        // setData(products)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Error fetching products')
        } else {
          setError('Unknown error')
        }
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleItemClick = (title: string) => {
    router.push(`/${encodeURIComponent(title)}`)
    setSearchTerm('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm) {
      router.push(`/${encodeURIComponent(searchTerm)}`)
    }
    setSearchTerm('')
  }

  return (
    <>
      {isMobile ? (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="relative flex cursor-pointer items-center rounded-full border border-zinc-300 p-3">
              <Search size={20} className="text-zinc-400" />
            </div>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-white p-4">
              <Dialog.Title className="sr-only">Search products</Dialog.Title>
              <form onSubmit={handleSubmit} className="flex h-full w-full flex-col">
                <input
                  type="text"
                  placeholder="Search by brand, model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 text-lg outline-none"
                />
                {loading && <p className="text-center text-zinc-500">Searching...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {data && data.search.edges.length > 0 && (
                  <ul className="mt-2 max-h-60 overflow-auto">
                    {data.search.edges.map(({ node }: any) => (
                      <li
                        key={node.id}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleItemClick(node.title)}
                      >
                        {node.title}
                      </li>
                    ))}
                  </ul>
                )}
                {data && data.search.edges.length === 0 && (
                  <p className="mt-2 text-center text-zinc-500">No products found</p>
                )}
              </form>
              <Dialog.Close className="absolute right-4 top-4">X</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2"
        >
          <Search size={20} className="text-zinc-400" />
          <input
            type="text"
            placeholder="Search by brand, model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent p-1 pl-4 text-sm text-zinc-700 placeholder-zinc-400 outline-none"
          />
        </form>
      )}
    </>
  )
}
