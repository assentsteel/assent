"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import DeleteCareerDialog from "./components/DeleteCareerDialog";

type Career = {
  _id: string;
  title: string;
  department: string;
  location: string;
  applyLink: string;
};

const CareersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [careers, setCareers] = useState<Career[]>([]);
  const router = useRouter();

  const fetchCareers = async () => {
    const response = await fetch("/api/admin/careers");
    const data = await response.json();
    setCareers(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleClickNewCareer = () => {
    router.push("/admin/careers/new");
  };

  const handleEditCareer = (careerId: string) => {
    router.push(`/admin/careers/${careerId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading careers...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Careers</h1>
        <Button className="bg-primary text-white" onClick={handleClickNewCareer}>
          <span className="mr-2">+</span>
          Add Career
        </Button>
      </div>
      {careers?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No careers found</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first career</p>
          <Button className="bg-primary text-white" onClick={handleClickNewCareer}>
            <span className="mr-2">+</span>
            Add Career
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers?.map((career) => (
            <Card key={career._id}>
              <CardHeader>{career.title}</CardHeader>
              <CardContent>
                <p>{career.department}</p>
                <p>{career.location}</p>
                <p>{career.applyLink}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => handleEditCareer(career._id)}>
                  Edit
                </Button>
                <DeleteCareerDialog careerId={career._id} onDelete={fetchCareers} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareersPage;
