export type LocationItem = {
  externId: string
  name: string
  tagline: string
  sleepCapacity: number
  caretaker: {
    externId: string
    name: string
    createdAt: string
  }
  publishedAt: string | null
  internetSpeedMbps: number
  address: {
    locality: string
    admininstrativeAreaLevel1Short: string
    country: string
  } | null
  bannerImageIpfsHash: string
  description: string
  voteCount: number
  offerCount: number
  recentVoters: {
    externId: string
    avatarUrl: string
  }[]
  // votes(_size: 3) {
  //   data {
  //     _id
  //     profile {
  //       _id
  //       avatar {
  //         url
  //       }
  //     }
  //     count
  //   }
  // }
}
