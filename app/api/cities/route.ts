import { getCities } from "@/lib/cities-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const params = new URL(request.url).searchParams;
  const sortQuery = params.get("sortBy");
  const filterQuery = params.get("filter");
  let res;
  if (sortQuery) {
    const sortDir = sortQuery.split(" ")[1];
    const sortBy = sortQuery.split(" ")[0];
    res = await getCities(
      params.get("limit")!,
      params.get("pageNum")!,
      sortBy,
      sortDir,
      filterQuery ? filterQuery : ""
    );
  } else {
    res = await getCities(params.get("limit")!, params.get("pageNum")!);
  }
  return NextResponse.json({ data: res ? res : [] });
}
