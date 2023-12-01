"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { ReactNode, ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

export type AnimeCard = JSX.Element;
function LoadMore() {
  const { ref, inView } = useInView();
  // const [data, setData] = useState<AnimeProp[]>([]);

  // //Load more
  // useEffect(() => {
  //   if (inView) {
  //     fetchAnime(page).then((res) => {
  //       setData([...data, ...res]); // keep track of existing data to add new data using ...res
  //       page++;
  //     });
  //   }
  // }, [inView, data]);
  const [data, setData] = useState<ReactNode[]>([]);

  // Load more
  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        // Convert each AnimeProp to a ReactNode
        const newData: ReactNode[] = res.map((anime) => (
          <AnimeCard key={anime.id} {...anime} />
        ));
        setData([...data, ...newData]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
