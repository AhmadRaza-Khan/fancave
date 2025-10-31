export function filterCollections(collections){

  const autographHandles = [
      'autographed-baseball', 
      'autographed-basketball', 
      'autographed-bat', 
      'autographed-framed-item', 
      'autographed-funko', 
      'game-used', 
      'autographed-helmets', 
      'autographed-jersey', 
      'autographed-photo', 
      'autographed-puck'
    ]
  const cardHandles = [
  "trading-cards",
  "bgs-graded-cards",
  "pokemon",
  "graded-cards",
  "sgc-graded-cards",
  "single-packs",
];
  
  const singleHandles = [
  "singles",
  "single-packs",
  "ungraded-cards",
  "pokemon-singles",
  "football-singles",
  "baseball-singles",
  "basketball-singles"
]


  const boxeHandles = [
  "blaster-boxes",
  "sealed-boxes",
  "retail-boxes",
];

    const giftHandle = ["gift-cards"]

    const autographs = collections.filter((c) =>
        autographHandles.some((kw) =>
        c.handle.includes(kw)
        )
    );

     const singles = collections.filter((c) =>
        singleHandles.some((kw) =>
        c.handle.includes(kw)
        )
    );

    const giftCards = collections.filter((c) =>
        giftHandle.some((kw) =>
        c.handle.includes(kw)
        )
    );

    const tradingCards = collections.filter((c) => 
    cardHandles.includes(c.handle)
    );

    const boxes = collections.filter((c) => 
    boxeHandles.includes(c.handle)
    );


    const otherCollections = collections.filter(
        (c) => !autographs.includes(c) && !tradingCards.includes(c) && !boxes.includes(c) && !singles.includes(c) && !giftCards.includes(c)
    );

    const filteredAllCollections = collections.filter(
        (c) => !giftCards.includes(c)
    );

    return {autographs, tradingCards, otherCollections, boxes, singles, filteredAllCollections}

}