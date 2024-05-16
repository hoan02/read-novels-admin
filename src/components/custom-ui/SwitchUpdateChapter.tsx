import { updateChapter } from "@/lib/actions/chapter.action";
import React from "react";
import toast from "react-hot-toast";
import { Switch } from "../ui/switch";

const SwitchUpdateChapter = ({
  id,
  field,
  initialValue,
}: {
  id: string;
  field: "isPublic" | "isLock" | "isApprove";
  initialValue: boolean;
}) => {
  const handleSwitchCustom = async () => {
    const params = { [field]: !initialValue };
    try {
      const res = await updateChapter(id, params);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return <Switch checked={initialValue} onCheckedChange={handleSwitchCustom} />;
};

export default SwitchUpdateChapter;
