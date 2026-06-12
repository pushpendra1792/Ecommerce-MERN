import { useNavigate } from "react-router";
import pageNotFound from "../assets/pageNotFound.png";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="m-10 flex justify-center items-center flex-col">
      <img className="max-w-200 mb-5 object-cover" src={pageNotFound} alt="" />
      <h1 className="text-5xl font-semi-bold font-sans mb-5">Oops! page not found</h1>
      <p className="mb-5">
        The page you are looking for cannot be found, Probably the link is Broken...
      </p>
      <button onClick={()=>{navigate('/')}} className="bg-black text-white px-4 py-2 rounded-full cursor-pointer">Go to Home</button>
    </div>
  );
};

export default PageNotFound;