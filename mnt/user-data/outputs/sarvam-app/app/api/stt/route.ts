import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get('file') as File
    const language = formData.get('language') as string || 'hi-IN'

    // yaha sarvam ke liye formdata forward karo
    const sarvamForm = new FormData()
    sarvamForm.append('file', audioFile)
    sarvamForm.append('language_code', language)
    sarvamForm.append('model', 'saarika:v2')
    sarvamForm.append('with_timestamps', 'false')

    const response = await fetch('https://api.sarvam.ai/speech-to-text', {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY!,
      },
      body: sarvamForm,
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: err }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json({ transcript: data.transcript })
  } catch (e) {
    return NextResponse.json({ error: 'STT failed' }, { status: 500 })
  }
}
