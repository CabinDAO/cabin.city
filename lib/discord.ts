import fetch from 'node-fetch'

export async function sendToDiscord(msg: string) {
  const url = process.env.DISCORD_MINTBOT_URL
  if (!url) {
    console.log('discord logs url missing from env vars')
    return
  }

  try {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'MintBot',
        // avatar_url: "",
        content: msg,
      }),
    })
  } catch (e: unknown) {
    console.error(e)
  }
}
