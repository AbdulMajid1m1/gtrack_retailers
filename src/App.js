import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PosModule from "./Pages/PosModule/PosModule";
import PriceChecker from "./Pages/PriceChecker/PriceChecker";
import InventoryItems from "./Pages/InventoryItems/InventoryItems";
import Login from "./Pages/Login/Login";
import ActivityForm from "./Pages/ActivityForm/ActivityForm";
import NewPassword from "./Pages/NewPassword/NewPassword";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import RetailerProfile from "./Pages/RetailerProfile/RetailerProfile";
import DataTableProvider from "./Contexts/DataTableContext";
import { CurrentUserProvider } from "./Contexts/CurrentUserContext";
import { SnackbarProvider } from "./Contexts/SnackbarContext";
import StoreLocations from "./Pages/StoreLocations/StoreLocations";

const App = () => {
  const MainLayout = ({ children }) => {
    return (
      <div className="main-layout-container">
        <Sidebar />
        <span className="right-layout">{children}</span>
      </div>
    );
  };
  return (
    <>
      <DataTableProvider>
        <SnackbarProvider>
          <CurrentUserProvider>

            <div>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="activity-form" element={<ActivityForm />} />
                  <Route path="new-password" element={<NewPassword />} />
                  <Route path="forgot-code" element={<ForgotPassword />} />
                  <Route path="verify" element={<VerifyCode />} />

                  <Route path="/price-checker" element={<PriceChecker />} />
                  <Route path="/pos-module" element={<PosModule />} />


                  <Route
                    path="/*"
                    element={
                      <MainLayout>
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/inventory-items" element={<InventoryItems />} />
                          <Route path="/retailer-profile" element={<RetailerProfile />} />
                          <Route path="/store-locations" element={<StoreLocations />} />
                        </Routes>
                      </MainLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>


            </div>
          </CurrentUserProvider>
        </SnackbarProvider>
      </DataTableProvider>


    </>
  );
};

export default App;