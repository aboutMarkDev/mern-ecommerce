import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAddNewAddress } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/User";

type AddNewAddressProps = {
  isAddingAddress?: boolean;
  setIsAddingAddress: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddNewAddress({
  setIsAddingAddress,
}: AddNewAddressProps) {
  const { user, setUser } = useUserContext();
  const { mutateAsync: addNewAddress, isPending: isNewAddAdding } =
    useAddNewAddress(user.id || "");

  const [newAddress, setNewAddress] = useState<string>("");

  const handleAddNewAddress = async () => {
    try {
      if (!newAddress) {
        return toast.error("No value for address");
      }

      const updatedAddress = await addNewAddress(newAddress);
      setUser({
        ...user,
        shippingAddress: updatedAddress.shippingAddress,
      });
      setIsAddingAddress(false);
      toast.success("New address added.");
      setNewAddress("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="font-medium text-sm">Add new address</h1>
      <Textarea
        value={newAddress}
        placeholder="(e.g., house no., street address, city, postal code)"
        onChange={(e) => setNewAddress(e.target.value)}
        className="h-20"
      />

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setIsAddingAddress(false)}
        >
          Cancel
        </Button>

        <Button
          type="button"
          size="sm"
          className="space-x-1"
          onClick={handleAddNewAddress}
          disabled={isNewAddAdding}
        >
          {isNewAddAdding ? (
            <>
              <Loader2 />
              <p>Loading...</p>
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </>
  );
}
