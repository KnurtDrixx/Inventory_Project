import * as React from "react";
import { useState, useEffect } from "react";

import AllIngredients from "./views/IngredientsViews/AllIngredients";
import CreateIngredients from "./views/IngredientsViews/CreateOREditIngredient";
import SingleIngredients from "./views/IngredientsViews/SingleIngredient";

import AllItems from "./views/ItemsViews/AllItems";
import CreateItems from "./views/ItemsViews/CreateOREditItem";

import SingleItems from "./views/ItemsViews/SingleItem";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main>
      <div>
        <Navbar />
        <Routes>
          <Route path="/admin/Items" element={<AllItems />} />
          <Route path="/admin/Items/new" element={<CreateItems />} />
          <Route path="/admin/Items/edit/:id" element={<CreateItems editMode />} />
          <Route path="/admin/Items/:id" element={<SingleItems />} />

          <Route path="/admin/Ingredients" element={<AllIngredients />} />
          <Route path="/admin/Ingredients/new" element={<CreateIngredients />} />
          <Route path="/admin/Ingredients/edit/:id" element={<CreateIngredients editMode />} />
          <Route path="/admin/Ingredients/:id" element={<SingleIngredients />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
