import { useUserContext } from "@/context/User";
import React from "react";
import { Button } from "./ui/button";
import { ChevronRight, MapPinIcon } from "lucide-react";

type ShippingInfoProps = {
  currentAddress: string;
  setIsAddressEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShippingInfo({
  currentAddress,
  setIsAddressEditing,
}: ShippingInfoProps) {
  const { user } = useUserContext();
  return (
    <>
      <div className="flex-between text-sm font-medium">
        <h1>Hello, {user.name}</h1>
        <h3 className="italic">{user.contactNumber}</h3>
      </div>

      <Button
        variant="ghost"
        className="flex-between group overflow-hidden whitespace-normal"
        type="button"
        onClick={() => setIsAddressEditing(true)}
      >
        <div className="flex items-center space-x-1 text-start overflow-hidden">
          <MapPinIcon />
          <p className="font-light">
            {currentAddress ? currentAddress : "No shipping address..."}
          </p>
        </div>

        <ChevronRight className="group-hover:translate-x-1 group-hover:duration-200" />
      </Button>
    </>
  );
}
