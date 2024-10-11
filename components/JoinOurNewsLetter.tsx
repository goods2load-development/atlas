import arrowRightIcon from "@/assets/arrow-right-input.svg";
import { Input } from "./ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof schema>;

export default function JoinOurNewsLetter() {
  const { toast } = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    toast({
      description: "You have successfully registered to our list",
      className: "bg-green-500 text-white",
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[246px] w-full sm:ml-auto"
    >
      <legend className="mb-4 font-semibold">Join our News Letter</legend>
      <div className="relative">
        <Input
          type="email"
          className="pr-7 w-full text-black"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}{" "}
        <button
          type="submit"
          title="send"
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          <Image src={arrowRightIcon} width={24} height={24} alt="send" />
        </button>
      </div>
    </form>
  );
}
