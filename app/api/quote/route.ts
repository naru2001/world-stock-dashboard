export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const symbol = searchParams.get("symbol")

  // USDJPYだけ別処理
  if (symbol === "USDJPY") {
  const res = await fetch(
    "https://api.frankfurter.app/latest?from=USD&to=JPY"
  )

  const data = await res.json()

  const price = data.rates.JPY

  return Response.json({
    c: price,
    d: 0,
    dp: 0,
  })
}

  // それ以外はFinnhub
  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
  )

  const data = await res.json()

  return Response.json(data)
}