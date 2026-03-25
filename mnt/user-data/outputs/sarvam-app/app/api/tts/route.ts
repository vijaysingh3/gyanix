import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text, language = 'hi-IN', speaker = 'meera' } = await req.json()

    const response = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': process.env.SARVAM_API_KEY!,
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: language,
        speaker,
        model: 'bulbul:v2',
        enable_preprocessing: true,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: err }, { status: response.status })
    }

    const data = await response.json()
    // yaha base64 audio return hota hai
    return NextResponse.json({ audio: data.audios?.[0] })
  } catch (e) {
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 })
  }
}
