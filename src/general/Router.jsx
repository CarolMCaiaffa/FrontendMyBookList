import { Route, Routes } from "react-router-dom";

import { RoutePaths } from "./RoutePaths.jsx";
import { Home } from "../home/Home.jsx";
import { NotFound } from "./NotFound.jsx";
import { Layout } from "./Layout.jsx";
import { AppLayout } from "./AppLayout.jsx";

import CreateAccount from "../components/Users/CreateAccount";
import Login from "../components/Users/Login";
import { UserAccount } from "../components/Users/UserAccount";
import CreateEditBook from "../components/Book/CreateEditBook.jsx";

import BookList from "../components/Book/BookList.jsx";

export const Router = () => (
  <Routes>
    <Route
      path={RoutePaths.HOME}
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />

    <Route
      path={RoutePaths.LOGIN}
      element={
        <Layout>
          <Login />
        </Layout>
      }
    />

    <Route
      path={RoutePaths.CREATEACCOUNT}
      element={
        <Layout>
          <CreateAccount />
        </Layout>
      }
    />

    <Route
      path={RoutePaths.USERACCOUNT}
      element={
        <AppLayout>
          <UserAccount />
        </AppLayout>
      }
    />

    <Route
      path={RoutePaths.CREATEEDITBOOK}
      element={
        <AppLayout>
          <CreateEditBook />
        </AppLayout>
      }
    />

    <Route
      path={RoutePaths.EDITBOOK}
      element={
        <AppLayout>
          <CreateEditBook />
        </AppLayout>
      }
    />

    <Route
      path={RoutePaths.BOOKLIST}
      element={
        <AppLayout>
          <BookList />
        </AppLayout>
      }
    />

    <Route
      path="*"
      element={
        <Layout>
          <NotFound />
        </Layout>
      }
    />
  </Routes>
);
