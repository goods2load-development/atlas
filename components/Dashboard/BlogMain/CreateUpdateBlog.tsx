"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useBlogAdminStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Editor from "@/components/ui/editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fileToBase64 } from "@/lib/utils";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import CategoryDialog from "./CategoryDialog";
import { Blog } from "./types";

const formSchema = z.object({
  title: z.string().nonempty(),
  slug: z
    .string()
    .nonempty()
    .regex(
      /^[a-z]+(-[a-z]+)*$/,
      "Slug must be in the format 'format-format-format'"
    ),
  content: z.string().min(1),
  blogTypeId: z.string().nonempty(),
  description: z.string(),
  mainImg: z.union([
    z.string(),
    z
      .unknown()
      .transform((value) => value as FileList)
      .refine((files) => files?.length === 1, "You need to provide a file")
      .refine(
        (files) => files?.[0]?.size <= 2000000,
        "The file is too large, it should be less than 2MB"
      ),
  ]),
  authorName: z.string(),
});

const CreateUpdateBlog = ({
  type,
  post,
}: {
  type: "create" | "update";
  post?: Blog;
}) => {
  // const isCreate = type === "create";
  const isUpdate = type === "update";

  const { categories, createBlog, updateBlog, getBlogs, getBlogCategories } =
    useBlogAdminStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    ...(post && {
      defaultValues: {
        title: post.title,
        slug: post?.slug,
        content: post?.content,
        blogTypeId: post?.blogTypeId,
        description: post.description,
        authorName: post.authorName,
        mainImg: post.mainImageUrl as string,
      },
    }),
  });

  const [banner, setBanner] = useState<FileList | string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(
    post?.mainImageUrl
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.mainImageUrl}`
      : null
  );

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const processBanner = async () => {
      if (!banner) return;

      if (typeof banner === "string") {
        setImgSrc(banner);
      } else if (banner?.length) {
        const base64 = await fileToBase64(banner[0] as File);
        setImgSrc(base64);
      }
    };

    processBanner();
  }, [banner]);

  useEffect(() => {
    getBlogCategories();
  }, []);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isUpdate && post) {
      updateBlog(data, post.id)
        .then(() =>
          toast({
            title: "Post updated.",
            variant: "destructive",
            className: "bg-green-500 text-white",
          })
        )
        .then(() => router.push("/dashboard/blog"))
        .then(() => setTimeout(() => window.location.reload(), 200));

      return;
    }

    createBlog(data)
      .then(() => getBlogs({ page: 1, take: 5 }))
      .then(() =>
        toast({
          title: "Post created.",
          variant: "destructive",
          className: "bg-green-500 text-white",
        })
      )
      .then(() => router.push("/dashboard/blog"));
  };

  if (!categories.length) return null;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="mainImg"
            render={({ field }) => (
              <FormItem className="w-full mb-5 sm:flex flex-wrap">
                <div className="sm:w-1/2 sm:pr-2">
                  <FormLabel className="text-[14px]/[18px] font-normal">
                    Main banner
                  </FormLabel>
                  <FormDescription className="text-[12px]">
                    *Attachments not bigger than 2MB
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files || null);
                      setBanner(e.target.files);
                    }}
                  />
                </FormControl>
                <FormLabel className="border border-black font-normal text-[14px] rounded-sm sm:w-1/2 py-2 flex justify-center items-center">
                  <Image
                    width={16}
                    height={16}
                    className="mr-[8px]"
                    src="/upload.svg"
                    alt="upload"
                  />
                  {field.value
                    ? (field.value as FileList)?.[0]?.name
                    : "Upload banner"}
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {imgSrc && (
            <div className="w-1/3 relative inline-block">
              <button
                onClick={() => {
                  form.setValue("mainImg", null as any);
                  setBanner(null);
                  setImgSrc(null);
                }}
                type="button"
                className="bg-orangePrimary w-4 h-4 rounded-full flex items-center justify-center
              absolute -top-2 -right-2"
              >
                <X color="white" />
              </button>
              <Image
                className="w-full"
                src={imgSrc as string}
                width={100}
                height={100}
                alt="banner"
                unoptimized
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-0"
                    placeholder="Blog Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-0"
                    placeholder="Slug"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor
                    {...(post && {
                      initialValue: post.content,
                    })}
                    onChange={(val: string) => field.onChange(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-0"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem className="w-full mb-5">
                <FormLabel>Author name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white border-0"
                    placeholder="Author name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end gap-4">
            <FormField
              control={form.control}
              name="blogTypeId"
              render={({ field }) => (
                <FormItem className="min-w-[300px]">
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={form.getValues("blogTypeId")}
                    onValueChange={field.onChange}
                  >
                    <FormControl className="max-w-[526px] w-full h-[60px] bg-white border-none rounded-[8px] pl-[20px] text-black pr-[20px]">
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(({ name, id }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CategoryDialog type="create" />
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            className="bg-orangePrimary border-2 border-orangePrimary font-medium text-[16px]/[22px] w-full my-5"
          >
            {isUpdate ? "Update post" : "Create post"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateUpdateBlog;
