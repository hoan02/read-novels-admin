"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateReport } from "@/lib/actions/report.action";

const replySchema = z.object({
  messageReply: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
});

const FormReport = ({ reportData }: { reportData: ReportWithUserType }) => {
  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      messageReply: reportData.messageReply,
    },
  });

  const onSubmit = async () => {
    const res = await updateReport(reportData._id, {
      isResolved: true,
      messageReply: form.getValues().messageReply,
    });
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  };

  return (
    <Form {...form}>
      <form className="p-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-center font-semibold text-lg mb-4">Trả lời</div>
        <FormField
          control={form.control}
          name="messageReply"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nội dung</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Gửi
        </Button>
      </form>
    </Form>
  );
};

export default FormReport;
