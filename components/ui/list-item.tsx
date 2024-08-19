const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex items-center border border-orange-500 p-4 w-full
rounded-lg shadow-lg bg-white hover:bg-orange-100 transition duration-300 ease-in-out"
    >
      {children}
    </div>
  );
};

export default ListItem;
