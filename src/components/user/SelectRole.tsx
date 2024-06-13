"use client";

import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateRole } from "@/lib/actions/clerk.action";

const SelectRole = ({
  userId,
  defaultValue,
}: {
  userId: string;
  defaultValue: string;
}) => {
  const handleChange = async (value: string) => {
    const res = await updateRole(userId, value);
    if (res) toast.success("Cập nhật vai trò thành công");
    else toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
  };

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Chọn vai trò" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>vai trò</SelectLabel> */}
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="writer">Writer</SelectItem>
          <SelectItem value="reader">Reader</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectRole;
