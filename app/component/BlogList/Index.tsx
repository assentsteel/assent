"use client";

import { useState } from "react";

import Herotext from "../common/Banner/Herotext";
// import Fillters from  "./sections/Fillters";
// import RecentBlogs from "./sections/RecentBlogs";
import BlogsList from "./sections/BlogsList";
import { Blogs } from '@/public/types/Common';


const Index = ({ data }: { data: Blogs }) => {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "" },

  ];
  const latestBlogs = data.blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // const [updated, setUpdated] = useState<{ value: string; label: string; }[]>([]);
  // const [filteredResults, setFilteredResults] = useState<Blogs['data'][0]['news']>(data.data[0].news); 
  const [visibleCount, setVisibleCount] = useState(8);
  // const [search,setSearch] = useState("")


  // useEffect(()=>{
  //   const applyFilters = (filters: { value: string; label: string }[]) => {
  //     console.log(filters)
  //     const latestBlogs = data.data[0].news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //     if(filters.length === 0){
  //       setFilteredResults(latestBlogs);
  //       return;
  //     }

  //     const [category, date,search] = filters;
  //     const filtered = latestBlogs;

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

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"Blogs"} />
      {/* <RecentBlogs data={data} /> */}
      {/* <Fillters data={data.categories} setUpdated={setUpdated} clearFilters={clearFilters} search={search} setSearch={setSearch}/> */}
      <BlogsList data={latestBlogs} visibleCount={visibleCount} setVisibleCount={setVisibleCount} />

    </>

  );
}

export default Index;
