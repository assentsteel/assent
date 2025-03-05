"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { ImageUploader } from "@/components/ui/image-uploader";
import { FileUploader } from "@/components/ui/file-uploader";
import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";

interface FileData {
  file: string;
  thumbnail: string;
  name: string;
}

interface AccreditationFormData {
  title: string;
  description: string;
  files: FileData[];
}

export default function AccreditationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {id} = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AccreditationFormData>({
    defaultValues: {
      title: "",
      description: "",
      files: [],
    },
  });

  const fetchAccreditation = async () => {
    const response = await fetch(`/api/admin/accreditation/byid?id=${id}`);
    const data = await response.json();
    setValue("title", data.data.title);
    setValue("description", data.data.description);
    setValue("files", data.data.files);
  };

  useEffect(() => {
    if(id){
      fetchAccreditation();
    }
  }, [id]);

  const files = watch("files");

  const addFile = () => {
    const currentFiles = files || [];
    setValue("files", [...currentFiles, { file: "", thumbnail: "", name: "" }]);
  };

  const removeFile = (fileIndex: number) => {
    const newFiles = files.filter((_, index) => index !== fileIndex);
    setValue("files", newFiles);
  };

  const updateFile = (fileIndex: number, data: Partial<FileData>) => {
    const newFiles = files.map((file, index) => {
      if (index === fileIndex) {
        return { ...file, ...data };
      }
      return file;
    });
    setValue("files", newFiles);
  };

  const onSubmit = async (data: AccreditationFormData) => {
    try {
      setIsLoading(true);
      if(id){
        const response = await fetch(`/api/admin/accreditation/byid?id=${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/accreditation");
      }else{
        const response = await fetch(`/api/admin/accreditation`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/accreditation");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full mx-auto p-6">
      <div className="space-y-4">
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
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </Label>
          <Input
            {...register("description", { required: "Description is required" })}
            type="text"
            id="description"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-4">Files</Label>

          <div className="space-y-4">
            {files?.map((file, fileIndex) => (
              <div key={fileIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium">File {fileIndex + 1}</h4>
                  <Button type="button" variant="destructive" size="icon" onClick={() => removeFile(fileIndex)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>

                <Input
                  placeholder="File name"
                  value={file.name}
                  onChange={(e) => updateFile(fileIndex, { name: e.target.value })}
                  className="mb-2"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">File</label>
                    <FileUploader value={file.file} onChange={(url) => updateFile(fileIndex, { file: url })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Thumbnail</label>
                    <ImageUploader
                      value={file.thumbnail}
                      onChange={(url) => updateFile(fileIndex, { thumbnail: url })}
                    />
                  </div>
                </div>
              </div>
            ))}

            {files?.length == 0 && (<Button type="button" variant="outline" onClick={addFile} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add File
            </Button>)}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
