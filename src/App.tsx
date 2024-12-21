import { useEffect, useState } from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import AddressPage from "pages/AddressPage";
import AddressesPage from "pages/AddressesPage";
import LoginPage from "pages/LoginPage";
import EditUserPage from "./pages/AccountPage/index1";
import EditProfile from "./pages/AccountPage";
import EventsPage from "./pages/FixationsPage";
import CartPage from "./pages/CartPage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "pages/RegistrationPage";
import { T_Address } from "src/modules/types.ts";
import { Container, Row } from "reactstrap";
import HomePage from "pages/HomePage";
import { invoke } from "@tauri-apps/api/core";
import "./App.css"; // Импорт вашего CSS

function App() {
    const [addresses, setAddresses] = useState<T_Address[]>([]);
    const [currentAddress, setSelectedAddress] = useState<T_Address | null>(null);
    const [isMock, setIsMock] = useState(false);
    const [AddressName, setAddressName] = useState<string>("");

    useEffect(()=>{
        invoke('tauri', {cmd:'create'})
          .then(() =>{console.log("Tauri launched")})
          .catch(() =>{console.log("Tauri not launched")})
        return () =>{
          invoke('tauri', {cmd:'close'})
            .then(() =>{console.log("Tauri launched")})
            .catch(() =>{console.log("Tauri not launched")})
        }
      }, [])

    return (
        <div className="wrapper">
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs currentAddress={currentAddress} />
                </Row>
                <Row>
                    <Routes>
                        <Route 
                            path="/" element={<HomePage />} 
                        />
                        <Route
                            path="/addresses/" element={<AddressesPage addresses={addresses} 
                            setAddresses={setAddresses} isMock={isMock} setIsMock={setIsMock} 
                            addressName={AddressName} setAddressName={setAddressName}/>}
                             />
                        <Route 
                        path="/addresses/:id" element={<AddressPage selectedAddress={currentAddress}
                         setSelectedAddress={setSelectedAddress} isMock={isMock}
                          setIsMock={setIsMock}/>} />
                        <Route 
                                path="/register" 
                                element={<RegisterPage />} 
                            />
                        <Route 
                                path="/login" 
                                element={<LoginPage />} 
                            />
                         <Route 
                                path="/profile" 
                                element={<EditProfile />} 
                            />
                        <Route 
                            path="/users/:userId/edit" 
                            element={<EditUserPage />} 
                        />
                        <Route 
                                path="/my_fixations" 
                                element={< EventsPage />} 
                            />
                        <Route 
                                path="/draft_fixation" 
                                element={< CartPage />} 
                            />
                    </Routes>
                </Row>
            </Container>
        </div>
    );
}

export default App;