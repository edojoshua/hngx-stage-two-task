"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command";
import { useQuery } from "@tanstack/react-query";
import { Loader2, TvIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import debounce from "lodash.debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import Link from "next/link";
import { fetchSearchMovies } from "@/lib/requests";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: () => fetchSearchMovies(input),
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
      className="rounded-lg border w-[35rem] text-white z-50 overflow-visible h-fit relative bg-transparent"
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="outline-none border-none focus focus:border-none focus:outline-none ring-0 bg-transparent"
        placeholder="What do you want to watch?"
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-black text-white top-full inset-x-0 shadow rounded-b-md">
          {isFetching && (
            <div className="w-full flex p-2 items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
          {isFetched && (
            <CommandEmpty className=" bg-black text-white p-3 text-sm font-medium">
              No results found.
            </CommandEmpty>
          )}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Movies">
              {queryResults?.map(
                (movie) =>
                  movie.id && (
                    <CommandItem
                      className="text-white"
                      key={movie.id}
                      value={movie.original_title}
                    >
                      <TvIcon className="mr-2 h-4 w-4" />
                      <Link href={`/movie/${movie.id}`}>
                        {movie.original_title}
                      </Link>
                    </CommandItem>
                  )
              )}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
