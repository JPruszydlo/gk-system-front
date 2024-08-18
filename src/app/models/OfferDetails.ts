export type OfferDetails = {
  name: string
  value: string
}

export type OfferPlan = {
  image: string
  floorName: string
  offerPlanParams: OfferDetails[]
}

export type OfferVisualisation = {
  image: string
}

export type Offer = {
  id: number
  name: string
  name2: string
  offerPlans: OfferPlan[]
  offerParams: OfferDetails[]
  offerVisualisations: OfferVisualisation[]
}
