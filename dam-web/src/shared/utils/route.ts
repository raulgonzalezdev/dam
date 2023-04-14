import Router from "next/router";
import { checkJwtIsValid } from "./check";

export async function reroute(access:string) {
    if (Router.pathname === "/" && checkJwtIsValid(access)) {
        await Router.push("/app/dashboard");
    } else if (Router.pathname.startsWith("/app") && !checkJwtIsValid(access)) {
        await Router.push("/");
    }
}