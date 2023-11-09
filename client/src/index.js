import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import NewAccountPage from './pages/newAccountPage';
import HomePage from './pages/homePage';
import CardsPage from './pages/cardsPage';
import FlashCardPage from './pages/flashCardPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App/></div>,
  },
  {
    path: "home",
    element: <div><HomePage/></div>,
  },
  {
    path: "novaConta",
    element: <div><NewAccountPage/></div>,
  },
  {
    path: "cartoes",
    element: <div><CardsPage/></div>,
  },
  {
    path:"flashcard",
    element: <div><FlashCardPage/></div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
