import { Button, Card, CardBody, CardText, CardTitle, NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteAddressFromCart } from "src/thunks/cartThunks";
import { AppDispatch } from "src/store";
import { NavLink as RRNavLink } from "react-router-dom";
import "./index.css";

interface FixProps {
  id: number;
  status: string;
  created_at: string;
  submitted_at: string;
  completed_at: string | null;
  addresses_count: number; 
  pay_date: string;
  true_id: number;
}


const FixCard = ({
  id,
  status,
  created_at,
  submitted_at,
  completed_at,
  addresses_count,
  pay_date,
  true_id
}: FixProps) => {

  return (
    <Card className="cart-card">
      <CardBody className="cart-card-body d-flex align-items-center">
        <div className="cart-card-content">
        <NavLink tag={RRNavLink} to={`/draft_fixation/${true_id}`} className="nav-link-custom">
          Номер: {id}
        </NavLink>
        </div>
        <div className="cart-card-content">
          <CardText>Статус: {status}</CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Создан: {created_at}  </CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Отправлен: {submitted_at}  </CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Завершен: {completed_at}</CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Количество адресов: {addresses_count} </CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Дата платежа: {pay_date}</CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default FixCard;