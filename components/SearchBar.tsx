"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, TvIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Movie } from "@/types/tmdb";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const accessToken: string | undefined = process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];

      try {
        const response = await axios.request({
          method: "GET",
          url: "https://api.themoviedb.org/3/search/movie",
          params: {
            query: input,
            include_adult: "false",
            language: "en-US",
            page: "1",
          },
          headers: {
            accept: "application/json",
            Authorization:
            `Bearer ${accessToken}`,
          },
        });

        console.log(response.data.results);
        return response.data.results as Movie[];
      } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
      }
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="rounded-lg border max-w-lg z-50 overflow-visible h-fit relative"
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="outline-none border-none focus focus:border-none focus:outline-none ring-0"
        placeholder="Explore"
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetching && (
            <div className="w-full flex p-2 items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Movies">
              {queryResults?.map((movie) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/movie/${e}`);
                    router.refresh();
                  }}
                  key={movie.id}
                  value={movie.original_title}
                >
                  <TvIcon className="mr-2 h-4 w-4" />
                  <a href={`/movie/${movie.id}`}>{movie.original_title}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;