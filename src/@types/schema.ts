type MessageResponse = {
  message: string,
}

type BodyFilter = {
  paging: {
    skip: number,
    take: number
  }
}

export type {MessageResponse, BodyFilter}
