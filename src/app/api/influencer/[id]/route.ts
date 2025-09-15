import supabase from "@/shared/libs/supabase-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
