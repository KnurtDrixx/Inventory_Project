import * as React from "react";
import { useState, useEffect } from "react";

import AllIngredients from "./views/IngredientsViews/AllIngredients";
import CreateIngredients from "./views/IngredientsViews/CreateOREditIngredient";
import SingleIngredients from "./views/IngredientsViews/SingleIngredient";

import AllItems from "./views/ItemsViews/AllItems";
import CreateItems from "./views/ItemsViews/CreateOREditItem";

import SingleItems from "./views/ItemsViews/SingleItem";

import LoginPage from "./views/loginRegister";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateWrapper from "./components/PrivateWrapper";
import Checkout from "./views/Checkout";

const App = () => {
  return (
    <main>
      <div>
        <Navbar />
        <Routes>
          <Route path="/admin/Items" element={<AllItems />} />

          <Route
            path="/admin/Items/new"
            element={
              <PrivateWrapper>
                <CreateItems />
              </PrivateWrapper>
            }
          />

          <Route
            path="/admin/Items/edit/:id"
            element={
              <PrivateWrapper>
                <CreateItems editMode />
              </PrivateWrapper>
            }
          />

          <Route path="/admin/Ingredients" element={<AllIngredients />} />
          <Route path="/admin/Ingredients/:id" element={<SingleIngredients />} />

          <Route
            path="/admin/Ingredients/new"
            element={
              <PrivateWrapper>
                <CreateIngredients />
              </PrivateWrapper>
            }
          />

          <Route
            path="/admin/Ingredients/edit/:id"
            element={
              <PrivateWrapper>
                <CreateIngredients editMode />
              </PrivateWrapper>
            }
          />

          <Route path="/admin/login" element={<LoginPage />} />

          <Route path="/admin/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
