import { NextRequest, NextResponse } from "next/server";
import supabase from "@/shared/libs/supabase-client";
import { InfluencerRegisterSchema } from "@/shared/types/data/influencer-types";
import axios from "axios";
import { ZodError } from "zod";

/**
 *
 * App router for POST user's data.
 *
 */

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = {
      userName: formData.get("userName")?.toString() ?? "",
      fullName: formData.get("fullName")?.toString() ?? "",
      followers: Number(formData.get("followers") ?? 0),
      role: "USER",
      picture: formData.get("picture"),
    };

    //Validate user type
    await InfluencerRegisterSchema.parseAsync(data);

    let pictureUrl: string | null = null;

    //Upload image to storage supabase
    if (data.picture && data.picture instanceof File) {
      const fileName = `${Date.now()}_${data.picture.name}`;
      const { error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(fileName, data.picture);

      if (uploadError) {
        return NextResponse.json(
          { success: false, error: uploadError.message },
          { status: 500 }
        );
      }

      //Get url image from storage
      const { data: urlData } = supabase.storage
        .from("pictures")
        .getPublicUrl(fileName);

      pictureUrl = urlData.publicUrl;
    }

    const { data: insertedData, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          userName: data.userName,
          fullName: data.fullName,
          followers: data.followers,
          role: data.role,
          picture: pictureUrl,
        },
      ])
      .select();

    if (insertError) {
      //Include error for duplicate value from key value
      if (
        insertError.message.includes("duplicate key value") ||
        insertError.code === "23505"
      ) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { success: false, error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: insertedData });
  } catch (err) {
    //Validation Error
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    let message = "Something went wrong";
    if (err instanceof Error) {
      message = err.message;
    }
    console.error("Error: ", message);
    return NextResponse.json({ error: message, status: 500 });
  }
}

/**
 *
 * App router for GET user's data.
 *
 */
export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase.from("users").select();
    if (data) {
      console.log("Ada Data: ", data);
    }
    return NextResponse.json({ data: data, success: true });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response?.data);
    } else {
      console.error("Unknown error:", err);
    }
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
