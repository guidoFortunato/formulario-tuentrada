import { NextResponse } from "next/server";

export async function POST(req){
    const { tokenCF } = await req.json()
    const secret = process.env.RECAPTCHA_SECRET_KEY
	console.log({h: req.headers})

    if (!secret || !tokenCF) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }


    let formData = new FormData();
	formData.append('secret', secret);
	formData.append('response', tokenCF);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const data = await result.json();
    return NextResponse.json({ data })
}