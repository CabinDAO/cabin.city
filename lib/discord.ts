import fetch from 'node-fetch'

export const TEAM_MENTION = '<@&1306981462473703465>'

export async function sendToDiscord(msg: string) {
  const url = process.env.DISCORD_WEBHOOK_URL
  if (!url) {
    console.log('discord webhook url missing from env vars')
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
        username: 'cabin.city',
        // avatar_url: "",
        content: msg,
      }),
    })
  } catch (e: unknown) {
    console.error(e)
  }
}
