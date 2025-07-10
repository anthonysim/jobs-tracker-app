import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import App from "./App";
import { JobsList } from "./pages/JobsList";
import { supabase } from "./utils/supabaseClient";

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
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw redirect({ to: "/" });
    }

    return null;
  },
});

const routeTree = rootRoute.addChildren([homeRoute, todosRoute]);

export const router = createRouter({ routeTree });
