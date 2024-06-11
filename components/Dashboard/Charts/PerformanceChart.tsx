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
  Legend,
} from "recharts";
import Image from "next/image";

const data = [
  { name: "January", uv: 50, pv: 120, amt: 200 },
  { name: "February", uv: 30, pv: 180, amt: 221 },
  { name: "March", uv: 70, pv: 90, amt: 290 },
  { name: "April", uv: 100, pv: 150, amt: 200 },
  { name: "May", uv: 80, pv: 160, amt: 181 },
  { name: "June", uv: 110, pv: 130, amt: 250 },
  { name: "July", uv: 90, pv: 140, amt: 210 },
  { name: "August", uv: 60, pv: 100, amt: 210 },
  { name: "September", uv: 40, pv: 170, amt: 220 },
  { name: "October", uv: 120, pv: 110, amt: 180 },
  { name: "November", uv: 130, pv: 190, amt: 240 },
  { name: "December", uv: 150, pv: 130, amt: 230 },
];

const formSchema = z.object({
  selectValue: z.string().min(3),
});

const PerformanceChart: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectValue: "",
    },
  });

  return (
    <div className="mt-6 bg-[#FFF] p-9 rounded-[9px] max-w-[1150px]">
      <div className="flex items-center mb-14 justify-between">
        <span className="font-[500] text-[20px] leading-[22px] text-[#29292A]">
          Average demand versus last year
        </span>
        <div className="flex items-center gap-8 text-[18px] font-[500] text-[#46474C]">
          <div className="flex items-center gap-3">
            <span>This year</span>
            <div className="bg-[#FFEDE4] w-6 h-6 rounded-md"></div>
          </div>
          <div className="flex items-center gap-3">
            <span>Last year</span>
            <div className="bg-[#FF6720] w-6 h-6 rounded-md"></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[18px] font-[400] text-[#46474C]">
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
                        <FormControl className="w-[100px] h-[35px] bg-white border-none rounded-[8px] pl-[20px] text-black pr-[20px]">
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
      <div className="flex items-center">
        <div className="-mt-[40px]">
          <Image
            width={21}
            height={141}
            alt="av-dm"
            src="/average-demand.svg"
          />
        </div>
        <BarChart width={976} height={400} data={data}>
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
      </div>
    </div>
  );
};

export default PerformanceChart;
