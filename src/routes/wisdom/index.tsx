import { createFileRoute } from "@tanstack/react-router";
import { WisdomPage } from "../../pages";

export const Route = createFileRoute("/wisdom/")({
    component: WisdomPage
});
