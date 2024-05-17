import React from "react";
import toast from "react-hot-toast";
import { Switch } from "../ui/switch";

const SwitchUpdate = ({
  initialValue,
  updateFunction,
}: {
  initialValue: boolean;
  updateFunction: () => Promise<{ success: boolean; message: string }>;
}) => {
  const handleSwitchCustom = async () => {
    try {
      const res = await updateFunction();
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return <Switch checked={initialValue} onCheckedChange={handleSwitchCustom} />;
};

export default SwitchUpdate;
