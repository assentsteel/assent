"use client";

import { useEffect, useState } from "react"; 

import Herotext from "../common/Banner/Herotext";
import Fillters from  "./sections/Fillters";
import RecentNews from "./sections/RecentNews";
import NewsList from "./sections/NewsList";
import { News } from '@/public/types/Common';
 

const Index = ({ data }: { data: News }) => { 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News", href: "" },

  ];
const [updated, setUpdated] = useState<{ value: string; label: string; }[]>([]);
const [filteredResults, setFilteredResults] = useState<News['news']>(data.news); 
const [visibleCount, setVisibleCount] = useState(8);
const [search,setSearch] = useState("")

  
useEffect(()=>{
  const applyFilters = (filters: { value: string; label: string }[]) => {
    console.log(filters)
    if(filters.length === 0){
      setFilteredResults(data.news);
      return;
    }

    const [category, date,search] = filters;
    const filtered = data.news;

    console.log(category,date,search)
  
    const results = filtered.filter((item) => {
      const matchCategory = category.value != "Category"
        ? item.category?.toLowerCase() === category.value.toLowerCase()
        : true;

      const matchDate = date.value != "Date"
        ? item.createdAt.slice(0, 10) == date.value
        : true;

        const matchSearch = search.value
        ? item.mainTitle.toLowerCase().includes(search.value.toLowerCase())
        : true;

        console.log(matchCategory,matchDate,matchSearch)
  
      // return matchCategory && matchDate;

        return matchCategory && matchDate && matchSearch;

    });
  
     
    setFilteredResults(results);
    setVisibleCount(9);
  };
  applyFilters(updated);
},[updated])

const clearFilters = () => {
  setFilteredResults(data.news);
  setVisibleCount(9);
};

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={"News"} />
      <RecentNews data={data} />
      <Fillters data={data.categories} setUpdated={setUpdated} clearFilters={clearFilters} search={search} setSearch={setSearch}/>
      <NewsList data={filteredResults} visibleCount={visibleCount} setVisibleCount={setVisibleCount}/>

    </>

  );
}

export default Index;
