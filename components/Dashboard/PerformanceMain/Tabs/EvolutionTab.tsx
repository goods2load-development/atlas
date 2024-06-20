import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

export interface IPerformanceChart {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const formSchema = z.object({
  selectValue: z.string().min(3),
});

const PerformanceEvolutionChart = ({ data }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectValue: "",
    },
  });

  return (
    <div className="mt-6 bg-[#FFF] lg:p-9 p-4 rounded-[9px] max-w-[1150px] ">
      <div className="flex gap-2 items-center sm:mb-14 mb-8 sm:justify-between justify-center flex-wrap xl:flex-nowrap">
        <span className="font-[500] md:text-[20px] leading-[22px] text-[#29292A] w-full lg:w-auto mb-2 sm:mb-3 text-center lg:text-left">
          Average demand versus last year
        </span>
        <div className="flex items-center gap-2 md:gap-8 text-[18px] font-[500] text-[#46474C]">
          <div className="flex items-center gap-1 md:gap-3 text-sm md:text-base">
            <span>This year</span>
            <div className="bg-[#FFEDE4] w-4 h-4 sm:w-6 sm:h-6 rounded-md"></div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 text-sm md:text-base">
            <span>Last year</span>
            <div className="bg-[#FF6720] w-4 h-4 sm:w-6 sm:h-6 rounded-md"></div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <span className="text-[18px] font-[400] text-[#46474C] text-sm md:text-base">
            Data range
          </span>
          <Form {...form}>
            <div className="border rounded-lg text-[16px] leading-6 font-[400]">
              <FormField
                control={form.control}
                name="selectValue"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl className="w-[80px] md:w-[100px] h-[35px] bg-white border-none rounded-[8px] px-2 md:px-[20px] text-black">
                          <SelectTrigger>
                            <SelectValue placeholder="1 year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 year">1 year</SelectItem>
                          <SelectItem value="2 year">2 year</SelectItem>
                          <SelectItem value="3 year">3 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
              />
            </div>
          </Form>
        </div>
      </div>
      <div className="flex items-center sm:w-full w-[280px] overflow-x-scroll mx-auto">
        <div className="-mt-[20px] lg:-mt-[40px] min-w-[21px]">
          <Image
            width={21}
            height={141}
            alt="av-dm"
            src="/average-demand.svg"
          />
        </div>
        <div className="ml-auto flex-1 min-w-[800px] h-[200px] lg:h-[400px] sm:min-w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="none" />
              <XAxis
                dataKey="name"
                tickMargin={20}
                tick={{ fontSize: 8, fontFamily: "Arial", fill: "#29292A" }}
              />
              <YAxis
                axisLine={false}
                orientation="left"
                tickLine={false}
                tickMargin={20}
                tick={{ fontSize: 10, fontFamily: "Arial", fill: "#29292A" }}
              />
              <Tooltip />
              <Bar dataKey="pv" fill="#FF6720" />
              <Bar dataKey="uv" fill="#FFEDE4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvolutionChart;
