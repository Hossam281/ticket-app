import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets } from "../features/tickets/ticketsSlice";
import { setData } from "../features/client/clientSlice";

import Spinner from "../components/Spinner";
import List from "../components/List";

const UserProfile = () => {
  const { userTickets, isLoading } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTickets());
  }, []);
  if (userTickets?.length === 0) {
    return (
      <div className="mt-8 w-full min-h-screen  p-4 mx-auto">
        <div className=" mb-16 flex flex-col gap-6">
          <h2 className="text-xl md:text-3xl font-extrabold self-start mb-4">
            welcome {user?.name}{" "}
          </h2>
          <p className="text-xl md:text-3xl font-extrabold self-start mb-4">
            Email: {user?.email}
          </p>
          
        </div>
        <div className="w-full h-1 bg-black"></div>
        <h2 className="text-xl md:text-3xl font-extrabold self-start mb-4 mt-8">
          Your Tickets
        </h2>
        <p className="text-xl md:text-3xl text-center font-extrabold self-start mb-4 mt-8">
          No tickets found
        </p>
      </div>
    );
  }
  return (
    <div className="mt-8 w-full  p-4 mx-auto">
      <div className=" mb-16 flex flex-col gap-6">
        <h2 className="text-xl md:text-3xl font-extrabold self-start mb-4">
          welcome {user?.name}{" "}
        </h2>
        <p className="text-xl md:text-3xl font-extrabold self-start mb-4">
          Email: {user?.email}
        </p>
      </div>
      <div className="w-full h-1 bg-black"></div>
      <h2 className="text-xl md:text-3xl font-extrabold self-start mb-4 mt-8">
        Your Tickets
      </h2>
      {isLoading ? <Spinner /> : <List data={userTickets} userID={user?._id} />}
    </div>
  );
};

export default UserProfile;
