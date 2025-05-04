import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Order = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-foreground mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* Restaurant Orders diplay here  */}

        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {"order delivery details name"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address: </span>
                {"order.deliveryDetails.address"}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Total Amount: </span>
                {"order.totalAmount"}
              </p>
            </div>

            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status: string, index: number) => (
                      <SelectItem key={index} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;