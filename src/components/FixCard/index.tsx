import { Button, Card, CardBody, CardText, CardTitle, NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteAddressFromCart } from "src/thunks/cartThunks";
import { AppDispatch } from "src/store";
import { NavLink as RRNavLink } from "react-router-dom";
import "./index.css";


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

const statuses = {
  1: "В формировании",
  2: "Сформирована",
  3: "Одобрена",
  4: "Отклонена",
};


interface FixProps {
  id: number;
  user: string;
  status: string;
  created_at: string;
  pay_date: string;
  true_id: number;
  month: number;
}


const FixCard = ({
  id,
  user,
  status,
  month,
  created_at,
  pay_date,
  true_id
}: FixProps) => {
  console.log(pay_date)
  return (
    <Card className="cart-card">
      <CardBody className="cart-card-body d-flex align-items-center">
        <div className="cart-card-id">
        <NavLink tag={RRNavLink} to={`/draft_fixation/${true_id}`} className="nav-link-custom" >
          Id: {id}   
        </NavLink>
        </div>
        <div className="cart-card-content">
          <CardText>Сформирована: {created_at}  </CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Кем создана: {user}</CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Статус: {statuses[status]}</CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Месяц: {months[month]}</CardText>
        </div>
        <div className="cart-card-content">
          <CardText>Дата платежа: {pay_date}</CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default FixCard;