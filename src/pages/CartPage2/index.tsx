import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import CartAddressCard from "components/CartAddress";
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import { RootState } from "src/store";
import { api } from "src/api";
import { T_Address } from "src/modules/types.ts";

import { resetCartCount, setMonth, setStatus } from "src/slices/cartSlice"; // Actions
import { useNavigate } from "react-router-dom";
import { deleteCart, submitOrder, fetchCartAddresses, fetchCartFixation } from "src/thunks/cartThunks";
import "./index.css";

const CartPage2: React.FC = () => {
  const dispatch = useDispatch<any>(); 
  const navigate = useNavigate();
  const {draftId} = useParams<{ draftId: string }>();
  const [fixDetails, setFixDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cartItems = useSelector((state: RootState) => state.addresses_count.cartItems);
  const status = useSelector((state: RootState) => state.addresses_count.status);
  const month = useSelector((state: RootState) => state.addresses_count.month);
  const [fixMonth, setFixMonth] = useState<string>("");
  const months = {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь"
  };
  
  const monthNumbers = {
    "Январь": 0,
    "Февраль": 1,
    "Март": 2,
    "Апрель": 3,
    "Май": 4,
    "Июнь": 5,
    "Июль": 6,
    "Август": 7,
    "Сентябрь": 8,
    "Октябрь": 9,
    "Ноябрь": 10,
    "Декабрь": 11
  };

  const handleDeleteFromCart = (addressId: number) => {
  };

  const handleSubmitOrder = () => {
    if (cartItems.length == 0){
      navigate("/addresses");
    }
    else{
    dispatch(submitOrder({ fixationId: Number(draftId) }))
      .unwrap()
      .then(() => {
        alert("Ваш заказ успешно оформлен!");
        navigate("/addresses");
      })
      .catch((err) => {
        setError(err);
      });}
  };

  const handleDeleteCart = () => {
    dispatch(deleteCart({ fixationId: Number(draftId) }))
      .unwrap()
      .then(() => {
        navigate("/addresses");
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    console.log("cart");
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const rstatus = await dispatch(fetchCartFixation(draftId));
        if (status === 5) {
          setError("Данные не могут быть загружены, так как выставка удалена.");
          setLoading(false);
          return; // Прерываем загрузку
        }
        setFixMonth(months[month]);
      } catch (err) {
        console.error("Error fetching show details:", err);
        setError("Не удалось загрузить данные выставки.");
      } finally {
        setLoading(false);
      }
    };

    if (draftId) {
      fetchShowDetails();
      if (cartItems.length === 0) {
        // navigate("/addresses");
      }
      console.log("cartItems");
      console.log(cartItems);
      console.log("cartItems");
    }
  }, [draftId]);
  if (status===5) {dispatch(setStatus(0)); navigate("/addresses")};
  if (loading) return <div>Загрузка...</div>;
  return (
    <Container>
      <Row
        className="mb-4"
        style={{
          backgroundColor: "#D0B175",
          padding: "10px 20px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Col xs="2">
          <span style={{ fontWeight: "bold" }}>Фиксация №{draftId}</span>
        </Col>
        <Col xs="2">
          <span>Месяц:</span>
          <Input
            type="text"
            value={fixMonth}
            onChange={(e) => setFixMonth(e.target.value)}
            style={{ display: "inline-block", width: "100%" }}
            disabled={status !== 1}
          />
        </Col>
      </Row>

      {status === 1 && (
        <Row className="mb-3">
          <Col className="d-flex justify-content-start gap-3">
            <Button color="primary" onClick={handleSubmitOrder}>
              Сохранить
            </Button>
            <Button color="danger" onClick={handleDeleteCart}>
              Удалить
            </Button>
          </Col>
        </Row>
      )}

    {cartItems.length === 0 && <p>Корзина пуста.</p>}

    <Row>
      {cartItems.map((item) => (
        <Col key={item.address_id} xs="12" className="mb-3">
          <CartAddressCard
            addressId={item.address_id}
            fixationId={Number(draftId)!}
            address_name={item.address_name}
            area={item.area}
            photoUrl={item.photo}
            onDelete={handleDeleteFromCart}
            status={status}
          />
        </Col>
      ))}
    </Row>
    </Container>
  );
  
};

export default CartPage2;