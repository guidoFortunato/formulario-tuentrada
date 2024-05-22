import { NextResponse } from "next/server";

export async function POST(req) {
  const url = "https://www.google.com/recaptcha/api/siteverify";

  // Ensure the method is POST, enhancing security by rejecting unwanted request methods.
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false },
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY_GOOGLE;

  if (!secretKey) {
    // If the secret key is not found, log an error and return an appropriate response.
    console.error("RECAPTCHA_SECRET_KEY is not set in environment variables.");
    return NextResponse.json(
      { success: false },
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let postData;

  try {
    postData = await req.json();
    // console.log({postData})
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    return NextResponse.json(
      { success: false },
      { error: "Bad request" },
      { status: 400 }
    );
  }

  // console.log({ secretKey, postData });

  const { gRecaptchaToken } = postData;

  // Define the form data for the POST request to the ReCaptcha API.
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    const data = await response.json()

    if (data?.success && data?.score > 0.5) {
      // console.log("ReCaptcha score:", data?.score);
  
      return NextResponse.json({
        success: true,
        score: data.score,
      });
    } else {
      console.error("ReCaptcha verification failed:", {data, response});
      return NextResponse.json({ success: false },  { error: "ReCaptcha verification failed" }, { status: 403 });
    }
  } catch (error) {
    console.error("Error during ReCaptcha verification:", error);
    return NextResponse.json({ success: false }, { error: "Internal server error" }, { status: 500 });
  }


}
