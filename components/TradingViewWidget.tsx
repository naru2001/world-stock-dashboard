"use client"

import { useEffect, useRef } from "react"

type Props = {
  symbol: string
  title: string
}

export default function TradingViewWidget({
  symbol,
  title,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.innerHTML = ""

    const script = document.createElement("script")

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"

    script.async = true

    script.innerHTML = JSON.stringify({
      autosize: true,

      symbol: symbol,

      interval: "5",

      timezone: "Asia/Tokyo",

      theme: "dark",

      style: "3",

      locale: "ja",

      allow_symbol_change: false,

      hide_top_toolbar: true,

      hide_side_toolbar: true,

      hide_volume: true,

      withdateranges: false,

      details: false,

      calendar: false,

      studies: [],

      support_host: "https://www.tradingview.com",
    })

    ref.current.appendChild(script)

    return () => {
      if (ref.current) {
        ref.current.innerHTML = ""
      }
    }
  }, [symbol])

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-2">
        {title}
      </h2>

      <div
        className="rounded-2xl overflow-hidden"
        ref={ref}
      />
    </div>
  )
}