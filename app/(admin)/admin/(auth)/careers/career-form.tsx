"use client";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departments } from "./departmentData";

interface CareerFormData {
  title: string;
  location: string;
  department: string;
  applyLink: string;
  datePosted: string;
  type:string;
}

interface CareerFormProps {
  careerId?: string;
}

const CareerForm = ({ careerId }: CareerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CareerFormData>({
    defaultValues: {
      title: "",
      location: "",
      department: "",
      applyLink: "",
      datePosted: "",
    },
  });

  useEffect(() => {
    const fetchCareer = async () => {
      const response = await fetch(`/api/admin/careers/byid?id=${careerId}`);
      const data = await response.json();
      setValue("title", data.data.title);
      setValue("location", data.data.location);
      setValue("department", data.data.department);
      setValue("applyLink", data.data.applyLink);
      if (data.data.datePosted) {
        const formattedDate = new Date(data.data.datePosted).toISOString().split("T")[0];
        setValue("datePosted", formattedDate);
      }
      setValue("type",data.data.type)
    };

    if(careerId){
      fetchCareer();
    }
  }, [careerId]);

  const onSubmit = async (data: CareerFormData) => {
    try {
      setIsLoading(true);
      if (careerId) {
        const response = await fetch(`/api/admin/careers/byid?id=${careerId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/careers");
      } else {
        const response = await fetch(`/api/admin/careers`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/careers");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </Label>
          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </Label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Location
          </Label>
          <Input
            {...register("location", { required: "Location is required" })}
            type="text"
            id="location"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
        </div>

        <div>
          <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Department
          </Label>
          <Controller
            name="department"
            control={control}
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((item,index)=>(
                    <SelectItem value={item.value} key={index}>{item.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Apply Link
          </Label>
          <Input
            {...register("applyLink", { required: "Apply Link is required" })}
            type="text"
            id="applyLink"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.applyLink && <p className="mt-1 text-sm text-red-600">{errors.applyLink.message}</p>}
        </div>

        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Date Posted
          </Label>
          <Input
            {...register("datePosted", { required: "Date Posted is required" })}
            type="date"
            id="datePosted"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.datePosted && <p className="mt-1 text-sm text-red-600">{errors.datePosted.message}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default CareerForm;
