import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Address} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import { useDispatch } from "react-redux";
import {AddressMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";
import { fetchAddressById } from "src/thunks/addressThunk";
import { AppDispatch } from "src/store";
import './index.css';

type AddressPageProps = {
    selectedAddress: T_Address | null,
    setSelectedAddress: React.Dispatch<React.SetStateAction<T_Address | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressPage = ({selectedAddress, setSelectedAddress, isMock, setIsMock}: AddressPageProps) => {
    const { id } = useParams<{id: string}>();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const loadAddress = async () => {
          if (id) {
            const result = await dispatch(fetchAddressById(id));
            if (fetchAddressById.fulfilled.match(result)) {
              setSelectedAddress(result.payload);
            }
          }
        };
    
        loadAddress();
        return () => setSelectedAddress(null);
      }, [id, dispatch, setSelectedAddress]);

    const createMock = () => {
        setIsMock(true)
        setSelectedAddress(AddressMocks.find(Address => Address?.address_id == parseInt(id as string)) as T_Address)
    }

    if (!selectedAddress) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedAddress.photo}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3"> Адрес: {selectedAddress.address_name}</h1>
                    <h2 className="fs-5">Площадь: {selectedAddress.area}</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default AddressPage