import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  console.log("EMAIL_BASE_URL =", process.env.EMAIL_BASE_URL);

  const url = `${process.env.EMAIL_BASE_URL}/api/simf-contact-us`;
  console.log("Forwarding to:", url);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const text = await res.text();

  console.log("Status:", res.status);
  console.log("Body:", text);

  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}