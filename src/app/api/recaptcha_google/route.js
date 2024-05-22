import { NextResponse } from "next/server";

export async function POST(req, res) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY_GOOGLE;
  const postData  = await req.json();
  const url = "https://www.google.com/recaptcha/api/siteverify";

  const { gRecaptchaToken } = postData
  
  let res;

  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData,
    });
  
    
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { error: error }
    );
  }

  if( res && res.data?.success && res.data?.score > 0.5 ){
    console.log("res.data?.score", res.data?.score)

    return NextResponse.json({
      success: true,
      score: res.data.score
    })
  }else{
    return NextResponse.json({ success: false })
  }


 
}
