// "use client";

// import { useEffect, useState } from "react"; 

// import Herotext from "../common/Banner/Herotext";
// import Fillters from  "./sections/Fillters";
// import RecentNews from "./sections/RecentNews";
// import NewsList from "./sections/NewsList";
// import { News } from '@/public/types/Common';
 

// const Index = ({ data }: { data: News }) => { 
//   const breadcrumb = [
//     { label: "Home", href: "/" },
//     { label: "News", href: "" },

//   ];
// const [updated, setUpdated] = useState<{ value: string; label: string; }[]>([]);
// const [filteredResults, setFilteredResults] = useState<News['news']>(data.news); 
// const [visibleCount, setVisibleCount] = useState(8);
// const [search,setSearch] = useState("")

  
// useEffect(()=>{
//   const applyFilters = (filters: { value: string; label: string }[]) => {
//     console.log(filters)
//     const latestNews = data.news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//     if(filters.length === 0){
//       setFilteredResults(latestNews);
//       return;
//     }

//     const [category, date,search] = filters;
//     const filtered = latestNews;

//     console.log(category,date,search)
  
//     const results = filtered.filter((item) => {
//       const matchCategory = category.value != "Category"
//         ? item.category?.toLowerCase() === category.value.toLowerCase()
//         : true;

//       const matchDate = date.value != "Date"
//         ? item.date?.slice(0, 10) == date.value
//         : true;

//         const matchSearch = search.value
//         ? item.mainTitle.toLowerCase().includes(search.value.toLowerCase())
//         : true;

//         console.log(matchCategory,matchDate,matchSearch)
  
//       // return matchCategory && matchDate;

//         return matchCategory && matchDate && matchSearch;

//     });
  
     
//     setFilteredResults(results);
//     setVisibleCount(9);
//   };
//   applyFilters(updated);
// },[updated])

// const clearFilters = () => {
//   setFilteredResults(data.news);
//   setVisibleCount(9);
// };

//   return (
//     <>

//       <Herotext breadcrumbs={breadcrumb} title={"News"} />
//       <RecentNews data={data} />
//       <Fillters data={data.categories} setUpdated={setUpdated} clearFilters={clearFilters} search={search} setSearch={setSearch}/>
//       <NewsList data={filteredResults} visibleCount={visibleCount} setVisibleCount={setVisibleCount}/>

//     </>

//   );
// }

// export default Index;


"use client";

import { useEffect, useMemo, useState } from "react";
import Herotext from "../common/Banner/Herotext";
import Fillters from "./sections/Fillters";
import RecentNews from "./sections/RecentNews";
import NewsList from "./sections/NewsList";
import { News } from "@/public/types/Common";

const Index = ({ data }: { data: News }) => {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News", href: "" },
  ];

  /* ---------------- SORT ONCE ---------------- */
  const sortedNews = useMemo(() => {
    return [...data.news].sort(
      (a, b) =>
        new Date(b.date ?? b.createdAt).getTime() -
        new Date(a.date ?? a.createdAt).getTime()
    );
  }, [data.news]);

  /* ---------------- SPLIT DATA ---------------- */
  const recentNews = useMemo(() => sortedNews.slice(0, 3), [sortedNews]);
  const baseListNews = useMemo(() => sortedNews.slice(3), [sortedNews]);

  /* ---------------- STATES ---------------- */
  const [updated, setUpdated] = useState<{ value: string; label: string }[]>([]);
  const [filteredResults, setFilteredResults] = useState<News["news"]>(baseListNews);
  const [visibleCount, setVisibleCount] = useState(15);
  const [search, setSearch] = useState("");

  /* ---------------- FILTERING ---------------- */
  useEffect(() => {
    if (!updated || updated.length === 0) {
      setFilteredResults(baseListNews);
      return;
    }

    const [category, date, searchFilter] = updated;

    const results = baseListNews.filter((item) => {
      const matchCategory =
        category?.value && category.value !== "Category"
          ? item.category?.toLowerCase() === category.value.toLowerCase()
          : true;

      const matchDate =
        date?.value && date.value !== "Date"
          ? item.date?.slice(0, 10) === date.value
          : true;

      const matchSearch =
        searchFilter?.value
          ? item.mainTitle.toLowerCase().includes(searchFilter.value.toLowerCase())
          : true;

      return matchCategory && matchDate && matchSearch;
    });

    setFilteredResults(results);
    setVisibleCount(9);
  }, [updated, baseListNews]);

  /* ---------------- CLEAR FILTERS ---------------- */
  const clearFilters = () => {
    setFilteredResults(baseListNews);
    setVisibleCount(15);
    setUpdated([]);
    setSearch("");
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <Herotext breadcrumbs={breadcrumb} title="News" />

      {/* ONLY TOP 3 */}
      <RecentNews data={{ ...data, news: recentNews }} />

      <Fillters
        data={data.categories}
        setUpdated={setUpdated}
        clearFilters={clearFilters}
        search={search}
        setSearch={setSearch}
      />

      {/* REST OF NEWS */}
      <NewsList
        data={filteredResults}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
      />
    </>
  );
};

export default Index;