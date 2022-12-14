import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { amount } = useSelector((store: any) => store.cart);
  return (
    <>
      <nav>
        <div className="nav-center">
          <h3>People List</h3>
          <div className="nav-container">
            <button className="user-icon">
              <FaUser />
            </button>
            <div className="amount-container">
              <p className="total-amount">{amount}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
