import supabase from "@/shared/libs/supabase-client";
import { InfluencerRegisterSchema } from "@/shared/types/data/influencer-types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 *
 * App router to DELETE user's data by id.
 *
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (userError) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Data deleted successfully!",
      data: userData,
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response?.data);
    } else {
      console.error("Unknown error:", err);
    }
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}

/**
 *
 * App router to GET user's data by id.
 *
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single();

    if (userError) {
      return NextResponse.json({ message: "User not found!", status: 500 });
    }

    return NextResponse.json({ success: true, data: userData });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response?.data);
    } else {
      console.error("Unknown error:", err);
    }
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}

/**
 * App router to PUT data's user by id.
 *
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const formData = await req.formData();
    const data = {
      userName: formData.get("userName")?.toString() ?? "",
      fullName: formData.get("fullName")?.toString() ?? "",
      followers: Number(formData.get("followers") ?? 0),
      role: "USER",
      picture: formData.get("picture"),
    };
    const { error: existError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (existError) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    //Validate user type
    await InfluencerRegisterSchema.parseAsync(data);
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single();
    if (userError) {
      return NextResponse.json({ message: "User not found!", status: 500 });
    }
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

    const { data: updatedData, error: updateError } = await supabase
      .from("users")
      .update([
        {
          userName: data.userName,
          fullName: data.fullName,
          followers: data.followers,
          role: data.role,
          picture: pictureUrl,
        },
      ])
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ message: updateError }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updatedData });
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
