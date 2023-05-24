
export interface BuySubscription {
  duration: number;
}

export interface SubscriptionData {
  id: number;
  start: string,
  end: string,
  duration: number,
  userId: number,
  createdAt: string,
  active: boolean
}

