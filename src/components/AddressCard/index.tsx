import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import mockImage from "assets/mock.png";
import { Link } from "react-router-dom";
import { T_Address } from "modules/types.ts";
import './index.css';

interface AddressCardProps {
    address: T_Address,
    isMock: boolean
}

const AddressCard = ({ address, isMock }: AddressCardProps) => {
    return (
        <Card className="card-custom">
            <div className="card-img-wrapper">
                <CardImg src={isMock ? mockImage as string : address.photo} className="card-img-custom"/>
            </div>
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5" className="card-title-custom"> {address.address_name} </CardTitle>
                <CardText className="card-text-custom"> Площадь: {address.area} </CardText>
                <Link to={`/classrooms/${address.address_id}`}>
                    <Button className="button-custom">
                    Подробнее
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default AddressCard;