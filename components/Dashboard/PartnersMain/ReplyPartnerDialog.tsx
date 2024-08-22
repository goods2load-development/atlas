"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reply } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  message: z.string().max(1000),
});

const ReplyPartnerDialog = ({
  onSubmitCallback,
}: {
  onSubmitCallback: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmitCallback(data).then(() => setIsOpen(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        onCloseClick={() => setIsOpen(false)}
        className="p-8 max-h-[540px] overflow-y-scroll"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-[40px]/[48px] mb-3 uppercase font-bold">
            Reply
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mb-4">
                  <FormControl>
                    <Textarea
                      className="bg-gray-2 border-0 min-h-[120px]"
                      placeholder="Message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-primaryOrange w-full max-w-[521px] mx-auto rounded-[16px] text-center pt-[30px] pb-[30px] text-white text-[16px] font-medium"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogTrigger asChild>
        <button onClick={() => setIsOpen(true)} title="Reply">
          <Reply />
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ReplyPartnerDialog;
