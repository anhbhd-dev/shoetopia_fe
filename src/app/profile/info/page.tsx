import { FormChangePassword } from "@/components/profile/form-change-password";
import { FormInfo } from "@/components/profile/form-info";

export default function PersonalInfo() {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <FormChangePassword />
      </div>
      <div className="col-span-1">
        <FormInfo />
      </div>
    </div>
  );
}
