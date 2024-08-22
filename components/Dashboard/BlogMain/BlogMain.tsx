"use client";

import { Button } from "@/components/ui/button";
import ListItem from "@/components/ui/list-item";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import AddBlogDialog from "./AddBlogDialog";
import AddCategoryDialog from "./AddCategoryDialog";

const BlogMain = () => {
  //   const { toast } = useToast();

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
          Blog
        </h1>
        {true && <Spinner />}
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <AddCategoryDialog />
        <AddBlogDialog />
      </div>
      <div
        className={clsx({
          "pointer-events-none": true,
        })}
      >
        <ListItem>hello world!</ListItem>
      </div>
    </div>
  );
};

export default BlogMain;
