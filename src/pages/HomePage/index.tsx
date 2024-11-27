import { Container, Row, CardImg, CardImgOverlay, CardTitle, CardText, Card, CardBody } from "reactstrap";
import { useState } from "react";
import './index.css'; // Импортируем стили
const items = [
    {
        src: "http://127.0.0.1:9000/images/mai.jpg", // Замените URL на актуальный
        altText: "Первый технический университет в России",
        caption: "Прообраз современного вуза, основан при Екатерине II"
    },
    {
        src: "http://127.0.0.1:9000/images/main.jpg", // Замените URL на актуальный
        altText: "Здание выдержано в стиле ампира",
        caption: "Здание университета построено в стиле позднего московского ампира"
    },
    {
        src: "http://127.0.0.1:9000/images/main.jpg", // Замените URL на актуальный
        altText: "Инновации и технологии",
        caption: "МГТУ им. Баумана — ведущий технический вуз в России, задающий тренды в науке и технологиях"
    }
];

const item = {
    src: "http://127.0.0.1:9000/images/main.jpg", // Замените URL на актуальный
    altText: "Первый технический университет в России",
    caption: "Прообраз современного вуза, основан при Екатерине II"
}

const HomePage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    return (
        <Card className="card-custom" color="light" outline>
             <CardBody>
            <CardTitle tag="h2">
              Сервис фиксации счетчиков
            </CardTitle>
            <CardText>
              Снимайте показания счетчиков быстро и удобно
            </CardText>
          </CardBody>
          <CardImg
            alt="Card image cap"
            src={item.src}
            width="85%"
            height="85%"
          />
        </Card>
    );
}

export default HomePage;
