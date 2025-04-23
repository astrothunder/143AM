import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/wisdom")({
    component: () => {
        return (
            <>
                <div className="p-2 flex gap-2">
                    <Link to="/wisdom" className="[&.active]:font-bold">
                        Wisdom Home
                    </Link>{" "}
                    <Link
                        to="/wisdom/ninjascript-indicators"
                        className="[&.active]:font-bold"
                    >
                        Ninja Script Indicators
                    </Link>
                </div>
                <hr />
                <Outlet />
            </>
        );
    }
});
