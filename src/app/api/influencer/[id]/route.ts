import supabase from "@/shared/libs/supabase-client";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

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
