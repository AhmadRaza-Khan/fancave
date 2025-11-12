export function filterCollections(collections){

  const autographHandles = [
    'autographs',
    'football-singles',
    'autographed-baseball', 
    'autographed-bat',
    'autographed-basketball', 
  ]

  const cardHandles = [
    "trading-cards",
    "case-hit",
    "graded-cards",
    "sgc-graded-cards",
    "pokemon",
  ]

  const singleHandles = [
    "singles",
    "sealed-boxes",
    "retail-boxes",
    "single-packs",
    "blaster-boxes",
  ]

  const boxeHandles = [
    "graded-cards",
    "pokemon",
  ]

  const giftHandle = ["gift-cards"]

  const orderByHandles = (list, handles) =>
    list.sort((a,b) => handles.indexOf(a.handle) - handles.indexOf(b.handle))

  let autographs = collections.filter((c) => autographHandles.includes(c.handle))

  autographs = autographs.map((item) => ({
    ...item,
    title: item.title
      .replace(/Autographed/gi, "")
      .replace(/\s\s+/g, " ")
      .trim()
  }))

  autographs = orderByHandles(autographs, autographHandles)

  const singles = orderByHandles(
    collections.filter((c) => singleHandles.includes(c.handle)),
    singleHandles
  )

  const giftCards = collections.filter((c) => giftHandle.includes(c.handle))

  const tradingCards = orderByHandles(
    collections.filter((c) => cardHandles.includes(c.handle)),
    cardHandles
  )

  const boxes = orderByHandles(
    collections.filter((c) => boxeHandles.includes(c.handle)),
    boxeHandles
  )

  const otherCollections = collections.filter(
    (c) =>
      !autographs.includes(c) &&
      !tradingCards.includes(c) &&
      !boxes.includes(c) &&
      !singles.includes(c) &&
      !giftCards.includes(c)
  )

  const filteredAllCollections = collections.filter(
    (c) => !giftCards.includes(c)
  )

  return { autographs, tradingCards, otherCollections, boxes, singles, filteredAllCollections }
}
