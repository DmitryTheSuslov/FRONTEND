import { useState } from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import AddressPage from "pages/AddressPage";
import AddressesPage from "pages/AddressesPage";
import { Route, Routes } from "react-router-dom";
import { T_Address } from "src/modules/types.ts";
import { Container, Row } from "reactstrap";
import HomePage from "pages/HomePage";
import "./App.css"; // Импорт вашего CSS

function App() {
    const [addresses, setAddresses] = useState<T_Address[]>([]);
    const [currentAddress, setSelectedAddress] = useState<T_Address | null>(null);
    const [isMock, setIsMock] = useState(false);
    const [AddressName, setAddressName] = useState<string>("");

    return (
        <div className="wrapper">
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs currentAddress={currentAddress} />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/addresses/" element={<AddressesPage addresses={addresses} setAddresses={setAddresses} isMock={isMock} setIsMock={setIsMock} addressName={AddressName} setAddressName={setAddressName}/>} />
                        <Route path="/addresses/:id" element={<AddressPage selectedAddress={currentAddress} setSelectedAddress={setSelectedAddress} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    );
}

export default App;