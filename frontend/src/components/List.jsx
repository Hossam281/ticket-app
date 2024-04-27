import TicketCard from "./TicketCard";

const List = ({ data, userID }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 p-5">
      {data?.length < 0 ? (
        <p className="text-2xl col-span-12 font-extrabold text-gray-700 text-center 	 mb-4 mt-8 "> No Tickets Found</p>
      ) : (
        data?.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} userID={userID} />
        ))
      )}
    </div>
  );
};

export default List;
