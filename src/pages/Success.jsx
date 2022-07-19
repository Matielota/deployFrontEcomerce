import { useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import {Link} from "react-router-dom"
import { clearCart } from "../redux/cartRedux";
import { useNavigate } from "react-router-dom";


const Container= styled.div`
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
`
const ButtonBack=styled.button`
      padding: 10px; 
      margin-top: 20px; 
`
const Success = () => {
  const location = useLocation();
  const data = location.state?.stripeData;
  const cart = location.state?.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  let navigate = useNavigate()
  const dispatch = useDispatch();
 
  console.log(location.state)

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        }); 
        dispatch(clearCart())
        setOrderId(res.data._id);
        navigate(location.pathname, { replace: true });
        
       
        
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <Container
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
      <ButtonBack>Go to Homepage</ButtonBack>
      </Link>
    </Container>
  );
};

export default Success;
