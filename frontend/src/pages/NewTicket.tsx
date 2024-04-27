import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../features/tickets/ticketsSlice";



const NewTicket = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    product: "",
    description: "",
  });
  const products = ["android", "ios", "web", "windows", "macos", "linux"];
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.title || !selectedProduct || !formData.description) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const ticketData = {
      ...formData,
      product: selectedProduct,
      user: user._id,
      userName: user.name,
      userEmail: user.email,
    };
    try {
      dispatch(createTicket(ticketData));
      toast.success("Ticket created successfully");
      navigate("/");
      setFormData({
        title: "",
        product: selectedProduct,
        description: "",
      });
    } catch (error) {
      toast.error("Failed to create ticket");
    }
  };
  console.log(formData, selectedProduct);

  return (
    <div className="mt-8 min-h-screen w-full md:w-[70%] p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create a New Ticket
      </h1>
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
          <label> Select a Product</label>
          <Listbox value={selectedProduct} onChange={setSelectedProduct}>
            <div className="relative mt-1">
              <Listbox.Button className="relative border border-black w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedProduct}</span>
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {products.map((product, productIdx) => (
                    <Listbox.Option
                      key={productIdx}
                      className={({ active }) =>
                        `relative cursor-pointer rounded-lg select-none py-2 pl-10 pr-4 ${
                          active ? "bg-black text-white" : "text-gray-900"
                        }`
                      }
                      value={product}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
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
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
