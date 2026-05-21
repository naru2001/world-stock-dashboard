"use client"

import { useEffect, useState } from "react"

import TradingViewWidget from "@/components/TradingViewWidget"
import TradingViewTicker from "@/components/TradingViewTicker"

type Quote = {
  c: number
  d: number
  dp: number
}

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)

  async function fetchQuote() {
    const res = await fetch("/api/quote?symbol=USDJPY")

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
    <TradingViewTicker symbol="FX:USDJPY" />
    <TradingViewWidget
      symbol="FX:USDJPY"
      title="ドル円"
    />
    <TradingViewWidget
      symbol="TVC:USOIL"
      title="原油"
    />
    <TradingViewWidget
      symbol="OANDA:XAUUSD"
      title="金"
    />
  </main>
  )
}