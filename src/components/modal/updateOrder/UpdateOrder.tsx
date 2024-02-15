import { FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useFirestore } from "../../../context/dbContext";


export default function UpdateOrder({ id, orderId, status, onClose, updateOrder }: { id: string, orderId: string, status: string, onClose: () => void, updateOrder: (id: string, status: string) => void }) {
  const [currentStatus, setCurrentStatus] = useState<string>(status);
  const { updateBookOrder } = useFirestore();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateBookOrder)
      updateBookOrder(id, orderId, currentStatus);
    updateOrder(id, currentStatus)
    onClose();
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-1 text-center text-lg font-bold text-gray-800">
          Update Order
        </h2>
      </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleOnSubmit}>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Status
            </label>
            <div className="mt-1">
              <input
                id="status"
                name="status"
                type="text"
                placeholder="Enter status"
                required
                minLength={3}
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="block px-4 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              <IoMdSend className="mr-2" /> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
