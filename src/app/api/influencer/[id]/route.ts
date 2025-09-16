import supabase from "@/shared/libs/supabase-client";
import { UpdateUserPayload } from "@/shared/types/data/influencer-types";
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
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const formData = await req.formData();

    let pictureUrl: string | null = null;
    const updateData: UpdateUserPayload = {};

    // Taking optional field.
    const userName = formData.get("userName")?.toString();
    const fullName = formData.get("fullName")?.toString();
    const followers = formData.get("followers");
    const role = formData.get("role")?.toString();
    const picture = formData.get("picture");

    if (userName) updateData.userName = userName;
    if (fullName) updateData.fullName = fullName;
    if (followers) updateData.followers = Number(followers);
    if (role) updateData.role = role;

    // Upload image to supabase' storage.
    if (picture && picture instanceof File) {
      const fileName = `${Date.now()}_${picture.name}`;
      const { error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(fileName, picture);

      if (uploadError) {
        return NextResponse.json(
          { success: false, error: uploadError.message },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage
        .from("pictures")
        .getPublicUrl(fileName);

      pictureUrl = urlData.publicUrl;
      updateData.picture = pictureUrl;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 }
      );
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select();

    if (updateError) {
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: updatedData });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }

    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;

    console.error("Error: ", message);
    return NextResponse.json({ error: message, status: 500 });
  }
}
