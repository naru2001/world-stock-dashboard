export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const symbol = searchParams.get("symbol")

  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
  )

  const data = await res.json()

  return Response.json(data)
}