"use client"

import { useEffect, useState } from "react"

type Quote = {
  c: number
  d: number
  dp: number
}

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)

  async function fetchQuote() {
    const res = await fetch("/api/quote?symbol=AAPL")

    const data = await res.json()

    setQuote(data)
  }

  useEffect(() => {
    fetchQuote()

    const id = setInterval(fetchQuote, 10000)

    return () => clearInterval(id)
  }, [])

  return (
    <main className="p-8">
      <div className="max-w-sm rounded-2xl border p-4 shadow">
        <h1 className="text-xl font-bold">
          Apple
        </h1>

        {quote && (
          <>
            <p className="text-3xl mt-2">
              {quote.c}
            </p>

            <p
              className={
                quote.dp >= 0
                  ? "text-red-500"
                  : "text-blue-500"
              }
            >
              {quote.dp.toFixed(2)}%
            </p>
          </>
        )}
      </div>
    </main>
  )
}