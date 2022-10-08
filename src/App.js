import { useEffect } from "react";
import CartContainer from "./Components/CartContainer";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItems } from "./Feature/Cart/cartSlice";

const App = () => {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>....Loading</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
