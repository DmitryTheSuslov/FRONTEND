import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteAddressFromCart } from "src/thunks/cartThunks";
import { AppDispatch } from "src/store";
import "./index.css";

interface CartAddressCardProps {
  addressId: number;
  fixationId: number;
  address_name: string;
  area: string;
  photoUrl?: string; // URL фотографии
  onDelete: (addressId: number) => void;
  status: number; // Проп для удаления
}

const CartAddressCard = ({
  addressId,
  fixationId,
  address_name,
  area,
  photoUrl,
  onDelete,
  status
}: CartAddressCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteAddressFromCart({ fixationId, addressId }))
      .unwrap()
      .then(() => onDelete(addressId))
      .catch((err) => console.error(err));
    console.log(fixationId)
    console.log(addressId)
  };

  return (
    <Card className="cart-card">
      <CardBody className="cart-card-body d-flex align-items-center">
        {photoUrl && <img src={photoUrl} alt={name} className="cart-card-image" />}
        <div className="cart-card-content">
          <CardTitle tag="h5">Площадь: {area}м^2</CardTitle>
          <CardText>{address_name}</CardText>
        </div>
        {status === 1 &&(
        <Button color="danger" onClick={handleDelete}>
          Удалить
        </Button>)}
      </CardBody>
    </Card>
  );
};

export default CartAddressCard;