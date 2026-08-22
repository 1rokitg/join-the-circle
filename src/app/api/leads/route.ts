import { Lead } from "@/components/Mailchimp";
import { put, PutBlobResult } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { lead } = (await request.json()) as { lead: Lead };

  try {
    const result: PutBlobResult | null = await put(
      `leads/${lead.identifier}.json`,
      JSON.stringify(lead),
      {
        access: "private",
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      },
    );

    return NextResponse.json({
      success: true,
      url: result.url,
      lead: JSON.stringify(lead),
    });
  } catch (error) {
    console.error("Error pushing lead to vercel blob storage", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
