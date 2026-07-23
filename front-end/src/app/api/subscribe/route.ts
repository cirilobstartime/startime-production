import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const res = await fetch(`${process.env.EMAIL_BASE_URL}/api/subscribe`, {
    method: "POST",
    body: formData,
  });

  //const data = await res.json();
  const text = await res.text();

  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));
  console.log("Response:");
  console.log(text);

  return new Response(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") || "text/plain",
    },
  });
  //return NextResponse.json(data, { status: res.status });
}
