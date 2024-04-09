"use client";

import React, { useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ICityData } from "@/types/weather.types";
import Link from "next/link";
import { useDebounce } from "use-debounce";

const CityTable: React.FC = () => {
  const pageref = useRef(1);
  const [sortBy, setSortBy] = useState<string>();
  const [limit, setLimit] = useState<number>(10);
  const [sortDir, setSortDir] = useState<string>("ASC");
  const [filterQuery, setFilterQuery] = useState<string>();
  const [value] = useDebounce(filterQuery, 1000);

  const fetchData = async (page: any) => {
    pageref.current = page;
    return (
      await axios.get(
        `/api/cities?pageNum=${page}&limit=${limit}${
          sortBy ? `&sortBy=${sortBy} ${sortDir}` : ""
        }${filterQuery ? `&filter=name like ${value}` : ""}`
      )
    ).data;
  };

  const { fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery<ICityData>({
      initialPageParam: 1,
      staleTime: Infinity,
      queryKey: ["cities", limit, sortBy, sortDir, value],
      retry: 3,
      queryFn: ({ pageParam }) => fetchData(pageParam),
      getNextPageParam: () => pageref.current + 1,
      getPreviousPageParam: () => undefined,
      throwOnError(error, query) {
        return true;
      },
    });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (
      Math.ceil(scrollHeight - scrollTop) - clientHeight <= 1 &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };
  return (
    <div className="px-3 w-full">
      <div className="max-w-6xl mx-auto w-full mt-20">
        <div className="flex flex-col sm:flex-row justify-between md:items-center gap-5 py-2">
          <div className="flex items-center gap-2">
            <div>
              <select
                title="Sort Dir"
                onChange={(e) => setSortDir(e.target.value)}
                className="bg-transparent text-white selection:bg-transparent border-[#aaa]/50 rounded border p-1"
              >
                <option value="ASC" className="bg-stamuraibg">
                  ASC
                </option>
                <option value="DESC" className="bg-stamuraibg">
                  DESC
                </option>
              </select>
            </div>
            <div>
              <select
                title="No of Entries"
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="bg-transparent text-white selection:bg-transparent border-[#aaa]/50 rounded border p-1"
              >
                <option value="10" className="bg-stamuraibg">
                  10
                </option>
                <option value="25" className="bg-stamuraibg">
                  25
                </option>
                <option value="50" className="bg-stamuraibg">
                  50
                </option>
                <option value="100" className="bg-stamuraibg">
                  100
                </option>
              </select>
            </div>
            <div className="text-stamuraitext">entries per page</div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-1/2 md:w-1/3">
            <div className="text-stamuraitext">Search:</div>
            <div className="flex-1">
              <input
                type="text"
                title="Search"
                onChange={(e) => setFilterQuery(e.target.value)}
                className="bg-transparent rounded px-2 py-1 text-white border border-[#aaa]/50 w-full"
              />
            </div>
          </div>
        </div>
        <div className="h-[600px] overflow-auto" onScroll={handleScroll}>
          <table className="shadow-lg w-full bg-white">
            <thead className="z-10 sticky -top-[1px]">
              <tr className="hover:bg-gray-50">
                <th className="bg-blue-100 border text-left px-8 py-5 cursor-pointer">
                  #
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-5 cursor-pointer hover:bg-gray-50 duration-200 transition-all"
                  onClick={(e) => setSortBy("name")}
                >
                  City
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-5 cursor-pointer hover:bg-gray-50 duration-200 transition-all"
                  onClick={(e) => setSortBy("cou_name_en")}
                >
                  Country
                </th>
                <th
                  className="bg-blue-100 border text-left px-8 py-5 cursor-pointer hover:bg-gray-50 duration-200 transition-all"
                  onClick={(e) => setSortBy("timezone")}
                >
                  Timezone
                </th>
                <th className="bg-blue-100 border text-left px-8 py-5 cursor-pointer">
                  Latitude
                </th>
                <th className="bg-blue-100 border text-left px-8 py-5 cursor-pointer">
                  Longitude
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="border px-8 py-4" colSpan={6}>
                    Loading...
                  </td>
                </tr>
              ) : data && data.pages ? (
                data.pages.map(({ data: { results } }, pageIndex) =>
                  results.map((item, itemIndex) => (
                    <tr
                      className="hover:bg-gray-100 cursor-pointer"
                      key={`${pageIndex}-${itemIndex}`}
                    >
                      <td className="border px-8 py-4 font-medium">
                        {itemIndex + 1 + pageIndex * limit}
                      </td>
                      <td className="border px-8 py-4">
                        <Link
                          href={`/weather/${item.name.toLowerCase()}?lat=${
                            item.coordinates.lat
                          }&lon=${item.coordinates.lon}`}
                          className="text-blue-800 underline underline-offset-1"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="border px-8 py-4">{item.cou_name_en}</td>
                      <td className="border px-8 py-4">{item.timezone}</td>
                      <td className="border px-8 py-4">
                        {item.coordinates.lat}
                      </td>
                      <td className="border px-8 py-4">
                        {item.coordinates.lon}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td className="border px-8 py-4" colSpan={6}>
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CityTable;
