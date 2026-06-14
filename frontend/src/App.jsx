import { useEffect } from "react";
import MainRoute from "./routes/MainRoutes.jsx";
import Nav from "./components/Nav.jsx";
import { asyncCurrentUser } from "./store/actions/UserActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadProducts } from "./store/actions/ProductActions.jsx";

const App = () => {

  const user = useSelector((state)=> state.usersReducers.users);
  const product = useSelector((state)=> state.productReducers.products);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    product.length == 0 && dispatch(asyncLoadProducts());
  }, [dispatch,product.length]);

  useEffect(() => {
    !user && dispatch(asyncCurrentUser());
  }, [dispatch, user]);

  return (
    <div className="w-full min-h-screen py-0 px-0 relative">
      <div className="w-[100%] h-20 flex justify-center items-center py-0 px-0 mb-5 sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md">
        <Nav />
      </div>
      <MainRoute />
    </div>
  );  
};

export default App;
