import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Address } from "src/modules/types.ts";
import AddressCard from "components/AddressCard";
import { AddressMocks } from "src/modules/mocks.ts";
import { FormEvent, useEffect } from "react";
import * as React from "react";
import './index.css'; // Импортируем стили

type AddressesPageProps = {
    addresses: T_Address[],
    setAddresses: React.Dispatch<React.SetStateAction<T_Address[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    addressName: string,
    setAddressName: React.Dispatch<React.SetStateAction<string>>
}

const AddressesPage = ({ addresses, setAddresses, isMock, setIsMock, addressName, setAddressName }: AddressesPageProps) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/addresses/search?name=${addressName}`, { signal: AbortSignal.timeout(1000) });
            const data = await response.json();
            setAddresses(data.addresses);
            setIsMock(false);
        } catch {
            createMocks();
        }
    }

    const createMocks = () => {
        setIsMock(true);
        setAddresses(AddressMocks.filter(address => address.address_name.toLowerCase().includes(addressName.toLowerCase())));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isMock) {
            createMocks();
        } else {
            await fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className="container-custom">
            <Row className="justify-content-center mb-5"> 
                <Col xs="12" md="8" lg="6"> 
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Input
                            value={addressName}
                            onChange={(e) => setAddressName(e.target.value)}
                            placeholder="Поиск..."
                            className="me-2 search-input"
                        />
                        <Button color="primary" className="search-button">
                            Поиск
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="card-grid">
                {addresses?.map((address) => (
                    <Col key={address.address_id} md="auto" className="address-card-col">
                        <AddressCard address={address} isMock={isMock} />
                    </Col>
                ))}
            </Row>
    </Container>
    );
};

export default AddressesPage;