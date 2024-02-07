import { NextResponse } from "next/server";

export async function POST(req){
    const { token } = await req.json()
    const secret = process.env.RECAPTCHA_SECRET_KEY

    if (!secret || !token) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }


    let formData = new FormData();
	formData.append('secret', secret);
	formData.append('response', token);
	// formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const { success } = await result.json();
    return NextResponse.json({ success })
}