import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    await connectToDatabase();

    const data = await req.formData();

    const file = data.get("file");
    const userId = data.get("userId"); // 👈 get user id

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile_pictures",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // ✅ SAVE IMAGE URL TO DATABASE
    await User.findByIdAndUpdate(userId, {
      image: result.secure_url,
    });

    return NextResponse.json({
      url: result.secure_url,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}