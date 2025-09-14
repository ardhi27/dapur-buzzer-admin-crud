import { NextRequest, NextResponse } from "next/server";
import supabase from "@/shared/libs/supabase-client";
import { InfluencerRegisterSchema } from "@/shared/types/data/influencer-types";

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

    await InfluencerRegisterSchema.parseAsync(data);

    let pictureUrl: string | null = null;

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
      return NextResponse.json(
        { success: false, error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: insertedData });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase.from("users").select();
    if (data) {
      console.log("Ada Data: ", data);
    }
    return NextResponse.json({ data: data, success: true });
  } catch (err: any) {
    console.log(err);
  }
}
