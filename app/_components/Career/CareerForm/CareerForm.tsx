"use client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import AttachSvg from "../../Svg/CareerSvg/Attach/AttachSvg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  emailAddress: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  selectValue: z.string().min(3),
  currentFile: z
    .any()
    .refine((file) => file?.length == 1, "File is required.")
    .refine((file) => file[0]?.size <= 3000000, `Max file size is 5MB.`),
});

const CareerForm: React.FC = () => {
  const [currentFile, setPhoto] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      firstName: "",
      lastName: "",
      selectValue: "",
      currentFile: undefined,
    },
  });
  const fileRef = form.register("currentFile", { required: true });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  const data: any = [
    { placeHolder: "First name", type: "text", name: "firstName" },
    { placeHolder: "Last name", type: "text", name: "lastName" },
    { placeHolder: "Email", type: "email", name: "emailAddress" },
  ];

  return (
    <section className="max-w-[1440px] flex gap-[40px] flex-col w-full items-center career bg-bgCareer pt-[56px] pb-[88px]">
      <div className="text-[48px] text-white text-center font-poppins italic">
        WORK WITH US
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="image-name flex flex-col items-center gap-[20px] relative mb-[40px]">
            {data.map((it: any, i: number) => {
              return (
                <FormField
                  key={i}
                  control={form.control}
                  name={it.name}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={it.placeHolder}
                            type={it.type}
                            {...field}
                            className="w-[526px] h-[60px] border-none rounded-[8px]  bg-white pl-[20px] text-black placeholder-originalBlack"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
          </div>
          <div className="mb-[40px]">
            <FormField
              control={form.control}
              name="selectValue"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="w-[526px] h-[60px] bg-white border-none rounded-[8px] bg-white pl-[20px] text-black pr-[20px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Vacancy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <p className="text-[16px] text-white max-w-[526px] mb-[15px]">
            CV / Resume (please provide your CV in pdf, word or rtf document
            format)
          </p>
          <div className="bg-white rounded-[16px] w-[526px] h-full max-h-[150px] flex justify-center items-center flex-col pb-[31px]  pt-[30px] mb-[30px]">
            <p className="text-black text-center mb-[18px]">
              Drop your files here
            </p>
            <div>
              <div className="bg-customGrey w-full w-[218px] rounded-[5px] text-center pt-[20px] pb-[20px] pr-[20px] pl-[20px]  relative flex items-center gap-[10px]">
                <AttachSvg />

                <FormField
                  control={form.control}
                  name="currentFile"
                  render={() => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Label className="rounded-md text-black cursor-pointer">
                            Choose your file
                            <Input
                              type="file"
                              className="hidden"
                              {...fileRef}
                            />
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-primaryOrange w-full max-w-[521px] mx-auto rounded-[16px] text-center pt-[30px] pb-[30px] text-white text-[16px] font-medium"
          >
            Submit your application
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CareerForm;
