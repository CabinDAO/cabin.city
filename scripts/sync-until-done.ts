import fetch from 'node-fetch'
;(async function syncUntilDone() {
  // e.g. http://localhost:3000/api/sync-cabin
  const syncUrl = process.argv[2]
  if (!syncUrl) throw new Error('No syncUrl provided')
  console.log('syncUrl', syncUrl)

  let blocksTillLatest: number | null = null

  while (blocksTillLatest == null || blocksTillLatest > 100) {
    const resp = await fetch(syncUrl)
    if (resp.status !== 200) {
      throw new Error(`Sync failed: ${resp.status} ${resp.statusText}`)
    }
    const json = await resp.json()
    console.info(
      `Synced ${json.startBlock} to ${json.endBlock} | blocksTillLatest: ${json.blocksTillLatest}`
    )
    blocksTillLatest = json.blocksTillLatest
  }
})()

export {}
