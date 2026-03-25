import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text, source_language = 'hi-IN', target_language = 'en-IN' } = await req.json()

    const response = await fetch('https://api.sarvam.ai/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': process.env.SARVAM_API_KEY!,
      },
      body: JSON.stringify({
        input: text,
        source_language_code: source_language,
        target_language_code: target_language,
        model: 'mayura:v1',
        enable_preprocessing: true,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: err }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ translated: data.translated_text })
  } catch (e) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
