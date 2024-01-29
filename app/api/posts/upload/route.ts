import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
  const { AWS_S3_KEY, AWS_S3_SECRET, AWS_S3_REGION, AWS_S3_BUCKET } =
    process.env;

  const s3Client = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
      accessKeyId: AWS_S3_KEY || "",
      secretAccessKey: AWS_S3_SECRET || "",
    },
  });

  const fileName = Date.now().toString();
  const formData = await request.formData();
  const image: any = formData.get("image");
  const buffer = Buffer.from(await image?.arrayBuffer());
  const uploadParams: any = {
    Bucket: AWS_S3_BUCKET,
    Key: fileName,
    Body: buffer,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const uploadResult = await s3Client.send(command);
    console.log("Upload success:", uploadResult);
    const imageUrl = `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${fileName}`;
    return NextResponse.json({ success: true, imageUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}
