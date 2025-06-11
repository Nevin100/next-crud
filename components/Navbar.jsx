import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-600 rounded-md px-4 py-4">
      <span className="px-4 py-3 bg-white font-semibold rounded-md m-3 text-xl ">
        <Link href={"/"}>Crud-App-Practice</Link>
      </span>
      <span className="px-4 py-3 bg-blue-200 rounded-md font-semibold text-xl m-2">
        <Link href={"/add-topic"}>Add-Topic</Link>
      </span>
    </nav>
  );
};

export default Navbar;
