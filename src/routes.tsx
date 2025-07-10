import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import App from "./App";
import { JobsList } from "./components/JobsList";

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: App,
});

const todosRoute = createRoute({
  path: "/jobslist",
  getParentRoute: () => rootRoute,
  component: JobsList,
  loader: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({ to: "/" }); // not logged in
    }
    return null;
  },
});

const routeTree = rootRoute.addChildren([homeRoute, todosRoute]);

export const router = createRouter({ routeTree });
