import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  console.log("revalidation request received");
  const { tag, secret } = await req.json();
  console.log(tag);
  const revalidateSecrete = process.env.REVALIDATE_SECRET;

  if (revalidateSecrete !== secret) {
    console.log("signature doesnt matched");
    return;
  }

  revalidateTag("projects", "max");

  console.log("revalidated successfully");
  return Response.json({ revalidated: true });
}
