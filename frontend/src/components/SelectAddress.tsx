import { useUserContext } from "@/context/User";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useDeleteOneAddress } from "@/lib/react-query/queries";
import { toast } from "react-toastify";

type SelectAddressProps = {
  currentAddress: string;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsAddingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddressEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectAddress({
  currentAddress,
  setCurrentAddress,
  setIsAddingAddress,
  setIsAddressEditing,
}: SelectAddressProps) {
  const { user, setUser } = useUserContext();

  const { mutateAsync: deleteAddress } = useDeleteOneAddress(user.id || "");

  const handleDeleteAddress = async (address: string) => {
    try {
      const deletedAdd = await deleteAddress(address);
      setUser({
        ...user,
        shippingAddress: deletedAdd.shippingAddress,
      });
      toast.success("Address Deleted");

      if (currentAddress === address) {
        setCurrentAddress("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-3">
      <div className="flex-between">
        <h1 className="font-medium text-sm">Select Shipping Address</h1>
        <Button
          type="button"
          onClick={() => setIsAddingAddress(true)}
          size="sm"
          className="flex items-center gap-1"
        >
          <PlusCircle />
          Add New Address
        </Button>
      </div>
      {user.shippingAddress.length > 0 ? (
        user.shippingAddress.map((item) => {
          const isSelected = currentAddress === item;
          return (
            <div key={item} className="flex items-center gap-1">
              <div
                className={`border rounded-md px-3 py-2 flex-1 text-sm ${
                  isSelected && "ring-1 ring-black"
                }`}
                onClick={() => setCurrentAddress(item)}
              >
                {item}
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => handleDeleteAddress(item)}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })
      ) : (
        <div className="flex-center py-5 opacity-50 text-sm">
          No available address...
        </div>
      )}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => setIsAddressEditing(false)}
          className="w-full"
          variant={user.shippingAddress.length > 0 ? "default" : "outline"}
        >
          {user.shippingAddress.length > 0 ? "Save" : "Back"}
        </Button>
      </div>
    </div>
  );
}
