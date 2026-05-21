"use client"

import { useEffect, useRef } from "react"

type Props = {
  symbol: string
}

export default function TradingViewTicker({
  symbol,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.innerHTML = ""

    const script = document.createElement("script")

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js"

    script.async = true

    script.innerHTML = JSON.stringify({
      symbol: symbol,

      width: "200",

      colorTheme: "dark",

      isTransparent: false,

      locale: "ja",
    })

    ref.current.appendChild(script)
  }, [symbol])

  return <div ref={ref} />
}