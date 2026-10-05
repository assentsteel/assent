"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { RiDeleteBinLine } from "react-icons/ri";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import AdminItemContainer from "@/app/component/common/AdminItemContainer";
import { Textarea } from "@/components/ui/textarea";
import SeoFields from "@/app/component/common/SeoFields";
import { SeoFormValues } from "@/types/seo";

export interface GlobalPresenceEurope {
  seo: SeoFormValues;

  firstSection?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };

  secondSection?: {
    title?: string;
    items?: {
      value?: string;
      title?: string;
      description?: string;
    }[];
  };

  thirdSection?: {
    title?: string;
    description?: string;
    subtitle?: string;
    items?: {
      image?: string;
      imageAlt?: string;
      title?: string;
      description?: string;
    }[];
  };

  fourthSection?: {
    title?: string;
    items?: {
      image?: string;
      imageAlt?: string;
      title?: string;
      description?: string;
    }[];
  };

  fifthSection?: {
    title?: string;
    description?: string;
    items?: {
      image?: string;
      imageAlt?: string;
      title?: string;
      description?: string;
    }[];
  };

  sixthSection?: {
    title?: string;
    description?: string;
    items?: {
      logo?: string;
      logoAlt?: string;
      title?: string;
      description?: string;
    }[];
  };

  seventhSection?: {
    title?: string;
    description?: string;
    items?: {
      image?: string;
      imageAlt?: string;
      title?: string;
      description?: string;
    }[];
  };

  eighthSection?: {
    title?: string;
    description?: string;
    items?: {
      logo?: string;
      logoAlt?: string;
      title?: string;
      description?: string;
    }[];
    secondDescription?: string;
  };

  ninthSection?: {
    title?: string;
    description?: string;
    subtitle?: string;
    items?: {
      title?: string;
      description?: string;
    }[];
    secondDescription?: string;
  };

  tenthSection?: {
    title?: string;
    description?: string;
    items?: {
      title?: string;
      description?: string;
    }[];
  };

  eleventhSection?: {
    title?: string;
    description?: string;
    cta?: {
      text?: string;
      url?: string;
    };
    image?: string;
    imageAlt?: string;
  };

  twelfthSection?: {
    title?: string;
    items?: {
      title?: string;
      description?: string;
    }[];
  };
}

const GlobalPresenceEuropePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<GlobalPresenceEurope>();

  const {
    fields: secondSectionItems,
    append: secondSectionAppend,
    remove: secondSectionRemove,
  } = useFieldArray({
    control,
    name: "secondSection.items",
  });

  const {
    fields: thirdSectionItems,
    append: thirdSectionAppend,
    remove: thirdSectionRemove,
  } = useFieldArray({
    control,
    name: "thirdSection.items",
  });

  const {
    fields: fourthSectionItems,
    append: fourthSectionAppend,
    remove: fourthSectionRemove,
  } = useFieldArray({
    control,
    name: "fourthSection.items",
  });

  const {
    fields: fifthSectionItems,
    append: fifthSectionAppend,
    remove: fifthSectionRemove,
  } = useFieldArray({
    control,
    name: "fifthSection.items",
  });

  const {
    fields: sixthSectionItems,
    append: sixthSectionAppend,
    remove: sixthSectionRemove,
  } = useFieldArray({
    control,
    name: "sixthSection.items",
  });

  const {
    fields: seventhSectionItems,
    append: seventhSectionAppend,
    remove: seventhSectionRemove,
  } = useFieldArray({
    control,
    name: "seventhSection.items",
  });

  const {
    fields: eighthSectionItems,
    append: eighthSectionAppend,
    remove: eighthSectionRemove,
  } = useFieldArray({
    control,
    name: "eighthSection.items",
  });

  const {
    fields: ninthSectionItems,
    append: ninthSectionAppend,
    remove: ninthSectionRemove,
  } = useFieldArray({
    control,
    name: "ninthSection.items",
  });

  const {
    fields: tenthSectionItems,
    append: tenthSectionAppend,
    remove: tenthSectionRemove,
  } = useFieldArray({
    control,
    name: "tenthSection.items",
  });

  const {
    fields: twelfthSectionItems,
    append: twelfthSectionAppend,
    remove: twelfthSectionRemove,
  } = useFieldArray({
    control,
    name: "twelfthSection.items",
  });

  const handleAddGlobalPresenceEurope = async (data: GlobalPresenceEurope) => {
    try {
      const response = await fetch(`/api/admin/global-presence/europe`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in adding global presence europe", error);
    }
  };

  const fetchGlobalPresenceEuropeData = async () => {
    try {
      const response = await fetch(`/api/admin/global-presence/europe`);
      if (response.ok) {
        const data = await response.json();
        setValue("seo", data.data.seo);
        setValue("firstSection", data.data.firstSection);
        setValue("secondSection", data.data.secondSection);
        setValue("secondSection.items", data.data.secondSection.items);
        setValue("thirdSection", data.data.thirdSection);
        setValue("thirdSection.items", data.data.thirdSection.items);
        setValue("fourthSection", data.data.fourthSection);
        setValue("fourthSection.items", data.data.fourthSection.items);
        setValue("fifthSection", data.data.fifthSection);
        setValue("fifthSection.items", data.data.fifthSection.items);
        setValue("sixthSection", data.data.sixthSection);
        setValue("sixthSection.items", data.data.sixthSection.items);
        setValue("seventhSection", data.data.seventhSection);
        setValue("seventhSection.items", data.data.seventhSection.items);
        setValue("eighthSection", data.data.eighthSection);
        setValue("eighthSection.items", data.data.eighthSection.items);
        setValue("ninthSection", data.data.ninthSection);
        setValue("ninthSection.items", data.data.ninthSection.items);
        setValue("tenthSection", data.data.tenthSection);
        setValue("tenthSection.items", data.data.tenthSection.items);
        setValue("eleventhSection", data.data.eleventhSection);
        setValue("twelfthSection", data.data.twelfthSection);
        setValue("twelfthSection.items", data.data.twelfthSection.items);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching hse data", error);
    }
  };

  useEffect(() => {
    fetchGlobalPresenceEuropeData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddGlobalPresenceEurope)}
      >

        <AdminItemContainer>
          <Label main>First Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("firstSection.title")}
                />
              </div>
              <div>
                <Label className="text-sm font-bold">Description</Label>
                <Controller
                  name="firstSection.description"
                  control={control}
                  render={({ field }) => {
                    return (
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">Image</Label>
                    <Controller
                      name={`firstSection.image`}
                      control={control}
                      render={({ field }) => (
                        <ImageUploader
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.firstSection?.image && (
                      <p className="text-red-500">
                        {errors.firstSection?.image.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">Alt Tag</Label>
                    <Input
                      type="text"
                      placeholder="Alt Tag"
                      {...register(`firstSection.imageAlt`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Second Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("secondSection.title")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {secondSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-2 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => secondSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Value</Label>
                            <Input
                              type="text"
                              placeholder="Value"
                              {...register(
                                `secondSection.items.${index}.value`,
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div>
                          <Label>Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`secondSection.items.${index}.title`)}
                          />
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `secondSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      secondSectionAppend({
                        value: "",
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Third Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("thirdSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("thirdSection.description")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Subtitle</Label>
                <Input
                  type="text"
                  placeholder="Subtitle"
                  {...register("thirdSection.subtitle")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {thirdSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => thirdSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`thirdSection.items.${index}.image`}
                              control={control}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image Alt</Label>
                            <Input
                              type="text"
                              placeholder="Image Alt"
                              {...register(
                                `thirdSection.items.${index}.imageAlt`,
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`thirdSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `thirdSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      thirdSectionAppend({
                        image: "",
                        imageAlt: "",
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Fourth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("fourthSection.title")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {fourthSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => fourthSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`fourthSection.items.${index}.image`}
                              control={control}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image Alt</Label>
                            <Input
                              type="text"
                              placeholder="Image Alt"
                              {...register(
                                `fourthSection.items.${index}.imageAlt`,
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`fourthSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `fourthSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      fourthSectionAppend({
                        image: "",
                        imageAlt: "",
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Fifth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("fifthSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("fifthSection.description")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {fifthSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => fifthSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`fifthSection.items.${index}.image`}
                              control={control}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image Alt</Label>
                            <Input
                              type="text"
                              placeholder="Image Alt"
                              {...register(
                                `fifthSection.items.${index}.imageAlt`,
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`fifthSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `fifthSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      fifthSectionAppend({
                        image: "",
                        imageAlt: "",
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Sixth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("sixthSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("sixthSection.description")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {sixthSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => sixthSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Icon</Label>
                            <Controller
                              name={`sixthSection.items.${index}.logo`}
                              control={control}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Icon Alt</Label>
                            <Input
                              type="text"
                              placeholder="Icon Alt"
                              {...register(
                                `sixthSection.items.${index}.logoAlt`,
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`sixthSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `sixthSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      sixthSectionAppend({
                        logo: "",
                        logoAlt: "",
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Seventh Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("seventhSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("seventhSection.description")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {seventhSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => seventhSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image</Label>
                            <Controller
                              name={`seventhSection.items.${index}.image`}
                              control={control}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Image Alt</Label>
                            <Input
                              type="text"
                              placeholder="Image Alt"
                              {...register(
                                `seventhSection.items.${index}.imageAlt`,
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`seventhSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `seventhSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      seventhSectionAppend({
                        image: "",
                        imageAlt: "",
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Eighth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("eighthSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("eighthSection.description")}
                />
              </div>
            </div>

                        <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Second Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Second Description"
                  {...register("eighthSection.secondDescription")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {eighthSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => eighthSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Icon</Label>
                            <Controller
                              name={`eighthSection.items.${index}.logo`}
                              control={control}
                              render={({ field }) => (
                                <ImageUploader
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2">
                            <Label className="font-bold">Icon Alt</Label>
                            <Input
                              type="text"
                              placeholder="Icon Alt"
                              {...register(
                                `eighthSection.items.${index}.logoAlt`,
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`eighthSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `eighthSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      eighthSectionAppend({
                        logo: "",
                        logoAlt: "",
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Ninth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("ninthSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("ninthSection.description")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Subtitle</Label>
                <Input
                  type="text"
                  placeholder="Subtitle"
                  {...register("ninthSection.subtitle")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {ninthSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => ninthSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`ninthSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `ninthSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      ninthSectionAppend({
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Tenth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("tenthSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("tenthSection.description")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {tenthSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => tenthSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`tenthSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `tenthSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      tenthSectionAppend({
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Eleventh Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("eleventhSection.title")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Description"
                  {...register("eleventhSection.description")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">CTA Text</Label>
                <Input
                  type="text"
                  placeholder="CTA Text"
                  {...register("eleventhSection.cta.text")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">CTA URL</Label>
                <Input
                  type="text"
                  placeholder="CTA URL"
                  {...register("eleventhSection.cta.url")}
                />
              </div>
            </div>
                        <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image</Label>
                <Controller
                  name={`eleventhSection.image`}
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Image Alt</Label>
                <Input
                  type="text"
                  placeholder="Image Alt"
                  {...register("eleventhSection.imageAlt")}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <AdminItemContainer>
          <Label main>Twelfth Section</Label>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("twelfthSection.title")}
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Items</Label>
              <div className="border p-2 rounded-md flex flex-col gap-5">
                {twelfthSectionItems.map((field, index) => (
                  <div key={field.id}>
                    <div className="grid grid-cols-2 gap-6 relative border p-2 rounded-md">
                      <div className="absolute top-2 right-2">
                        <RiDeleteBinLine
                          onClick={() => twelfthSectionRemove(index)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Title</Label>
                          <Input
                            type="text"
                            placeholder="Title"
                            {...register(`twelfthSection.items.${index}.title`)}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="font-bold">Description</Label>
                          <Textarea
                            rows={4}
                            placeholder="Description"
                            {...register(
                              `twelfthSection.items.${index}.description`,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    className="w-full cursor-pointer text-white text-[16px]"
                    onClick={() => {
                      twelfthSectionAppend({
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <SeoFields<GlobalPresenceEurope> control={control} register={register} errors={errors} />

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full cursor-pointer text-white text-[16px]"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GlobalPresenceEuropePage;
