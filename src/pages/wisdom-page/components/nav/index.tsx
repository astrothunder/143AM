import { Link, useMatch } from "@tanstack/react-router";

const links = [
    { to: "/wisdom/page1", label: "Page 1" },
    { to: "/wisdom/page2", label: "Page 2" },
    { to: "/wisdom/page3", label: "Page 3" }
];

export function Nav() {
    return (
        <nav
            style={{
                padding: "1rem",
                backgroundColor: "#f4f4f4",
                borderBottom: "1px solid #ddd"
            }}
        >
            <ul
                style={{
                    listStyle: "none",
                    display: "flex",
                    gap: "1rem",
                    margin: 0,
                    padding: 0
                }}
            >
                {links.map((link) => {
                    const isActive = useMatch({ to: link.to });
                    return (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                style={{
                                    textDecoration: "none",
                                    color: isActive ? "#0056b3" : "#007BFF",
                                    fontWeight: isActive ? "bold" : "normal"
                                }}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
