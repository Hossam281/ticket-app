import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateTicket } from "../features/tickets/ticketsSlice";
import { toast } from "react-toastify";

export default function EditDialog({ isOpen, closeModal, ticket }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(ticket.status);
  const [formData, setFormData] = useState({
    title: ticket.title,
    product: ticket.product,
    description: ticket.description,
  });

  const products = ["android", "ios", "web", "windows", "macos", "linux"];
  const statusArray = ["new", "open", "closed"];
  const [selectedProduct, setSelectedProduct] = useState(ticket.product);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !selectedProduct || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const ticketData = {
      ...formData,
      product: selectedProduct,
      status: status,
    };
    try {
      dispatch(updateTicket(ticketData,ticket._id));
      toast.success("Ticket updated successfully");
      closeModal();
      window.location.reload();
      setFormData({
        title: "",
        product: selectedProduct,
        status:status,
        description: "",
      });
    } catch (error) {
      toast.error("Failed to create ticket");
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <p className="text-2xl font-bold mb-4 text-center">
                      Edit Ticket
                    </p>{" "}
                  </Dialog.Title>
                  <div className="mt-8  w-full p-4 mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Enter ticket title"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-black h-10  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label> Select Product</label>
                        <Listbox
                          value={selectedProduct}
                          onChange={setSelectedProduct}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className="relative mb-4 border border-black w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">
                                {selectedProduct}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <FaChevronDown />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {products.map((product, productIdx) => (
                                  <Listbox.Option
                                    key={productIdx}
                                    className={({ active }) =>
                                      `relative cursor-pointer rounded-lg select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-black text-white"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={product}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {product}
                                        </span>
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                        <label> Select Status</label>
                        <Listbox
                          value={status}
                          onChange={setStatus}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className="relative border border-black w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">
                                {status}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <FaChevronDown />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute  mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {statusArray.map((status, index) => (
                                  <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                      `relative cursor-pointer rounded-lg select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-black text-white"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={status}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {status}
                                        </span>
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          placeholder="Enter ticket description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="mt-1 block h-32 w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Submit
                        </button>
                        <button
                          onClick={closeModal}
                          type="submit"
                          className="w-full my-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
