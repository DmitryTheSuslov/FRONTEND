import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import mockImage from "assets/mock.png";
import { Link } from "react-router-dom";
import { T_Address } from "modules/types.ts";
import { useSelector, useDispatch } from "react-redux";
import { api } from "src/api"; // Ваши API запросы
import { useState } from "react";
import './index.css';
import { setCartCount, setDraftId, setCartItems } from "slices/cartSlice";


interface AddressCardProps {
    address: T_Address,
    isMock: boolean
}

const AddressCard = ({ address, isMock }: AddressCardProps) => {
    const sessionId = useSelector((state: any) => state.cookie.cookie); // Получаем session_id из Redux
    const currentCartCount = useSelector((state: any) => state.addresses_count.addressesCount);
    // console.log(currentCartCount);
    const currentCartItems = useSelector((state: any) => state.addresses_count.cartItems); // Текущее состояние корзины
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleAddToCart = async (addressId: number) => {
        if (!sessionId) {
            setError("Вы не авторизованы!");
            return;
        }

        try {
            const addressIdStr = String(addressId);
            const response = await api.addresses.addressesAddToFixCreate(addressIdStr, sessionId);

            if (response.status === 200) {
                setError(null);
                dispatch(setCartCount(currentCartCount + 1));
                const draftId = response.data.fixation_id;
                dispatch(setDraftId(draftId));

                const newCartItem = {
                    address_id: address.address_id,
                    address_name: address.address_name,
                    area: address.area,
                    photo: address.photo
                };
                dispatch(setCartItems([...currentCartItems, newCartItem]));
                // setSuccessMessage(currentCartItems);
                console.log(currentCartItems);
                setSuccessMessage("Аудитория успешно добавлена в корзину.");
            } else {
                setError("Ошибка при добавлении аудитории в корзину.");
                setSuccessMessage(null);
            }
        } catch (err) {
            console.error("Ошибка при добавлении аудитории:", err);
            setError("Ошибка при добавлении аудитории в корзину.");
            setSuccessMessage(null);
        }
    };

    return (
        <Card className="card-custom">
            <div className="card-img-wrapper">
                <CardImg src={isMock ? mockImage as string : address.photo} className="card-img-custom"/>
            </div>
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5" className="card-title-custom"> {address.address_name} </CardTitle>
                <CardText className="card-text-custom"> Площадь: {address.area} </CardText>
                <Link to={`/addresses/${address.address_id}`}>
                    <Button className="button-custom">
                    Подробнее
                    </Button>
                </Link>
                {sessionId && (
                    <Button
                        className="add-to-cart-button"
                        onClick={() => handleAddToCart(address.address_id)}
                    >
                        Добавить в корзину
                    </Button>
                )}

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </CardBody>
        </Card>
    );
};

export default AddressCard;