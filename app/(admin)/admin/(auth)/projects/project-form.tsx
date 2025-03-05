"use client";
import { Label } from "@/components/ui/label";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type ProjectData = {
  name: string;
  description: string;
  specifications: {
    name: string;
    value: string;
    logo:string;
  }[];
  images: string[];
  type:string;
  location:string;
};

interface ProjectFormData {
  projectId?: string;
}
const ProjectForm = ({ projectId }: ProjectFormData) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { register, handleSubmit, control, setValue,watch } = useForm<ProjectData>({
    defaultValues: {
      name: "",
      description: "",
      specifications: [],
      images: [],
    },
  });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/byid?id=${projectId}`);
      const res = await response.json();
      setValue("name", res.data.name);
      setValue("description", res.data.description);
      setValue("specifications", res.data.specifications);
      console.log(res.data.type)
      setValue("type", res.data.type);
      setValue("images", res.data.images);
      setValue("location", res.data.location);
      setImageUrls(res.data.images);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const onSubmit = async (data: ProjectData) => {
    try {

      if (projectId) {
        const response = await fetch(`/api/admin/projects/byid?id=${projectId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/projects");
      } else {
        const response = await fetch(`/api/admin/projects`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/projects");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (uploadedUrl: string) => {
    setImageUrls((prev) => [...prev, uploadedUrl]);
    setValue("images", [...imageUrls, uploadedUrl]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
    setValue(
      "images",
      imageUrls.filter((_, index) => index !== indexToRemove)
    );
  };


  const handleSpecLogoUpload = (index: number, uploadedUrl: string) => {
    setValue(`specifications.${index}.logo`, uploadedUrl);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{projectId ? "Edit" : "Create"} Project</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="bg-white" />
              )}
            />
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
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
            <Label htmlFor="name">Location</Label>
            <Input id="location" {...register("location")} />
          </div>


          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Specifications</Label>
              <Button type="button" variant="outline" onClick={() => appendSpec({ name: "", value: "",logo:"" })}>
                Add Specification
              </Button>
            </div>

            {specFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start">
                <div className="space-y-2 flex-1">
                  <Label htmlFor={`specifications.${index}.name`}>Logo</Label>
                  <ImageUploader value={watch(`specifications.${index}.logo`)} onChange={(url) => handleSpecLogoUpload(index, url)} deleteAfterUpload={true} />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor={`specifications.${index}.name`}>Name</Label>
                  <Input {...register(`specifications.${index}.name`)} placeholder="Specification name" />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor={`specifications.${index}.value`}>Value</Label>
                  <Input {...register(`specifications.${index}.value`)} placeholder="Specification value" />
                </div>
                <Button type="button" variant="destructive" className="mt-8" onClick={() => removeSpec(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          {/* Images */}
          <div>
            <Label className="block text-sm font-medium text-gray-700">Images</Label>
            <div className="mt-2">
              <ImageUploader onChange={handleImageUpload} deleteAfterUpload={true} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative h-40">
                  <Image
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                    width={100}
                    height={100}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full text-white">
            {isLoading ? "Saving..." : projectId ? "Update Project" : "Create Project"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProjectForm;
