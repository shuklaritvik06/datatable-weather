import { CITIES_API_URL } from "@/constants/stamurai-constants";
import axios from "axios";

export const getCities = async (
  limit: string,
  pageNum: string,
  sortQuery?: string,
  sortDir?: string,
  filter?: string
) => {
  const url = `${CITIES_API_URL}?limit=${limit}&offset=${
    parseInt(limit) * (parseInt(pageNum) - 1)
  }${sortQuery ? `&order_by=${sortQuery} ${sortDir ? sortDir : "ASC"}` : ""}${
    filter && filter.length !== 0 ? filter : ""
  }`;

  const { data } = await axios.get(url);
  return data;
};
