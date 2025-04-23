import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../pages";

export const Route = createFileRoute("/")({
  component: LandingPage,
});
