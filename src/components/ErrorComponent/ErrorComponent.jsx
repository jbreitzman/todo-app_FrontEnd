import React from "react";
import { withRouter } from "react-router-dom";

export function ErrorComponent() {
    return <div>404 Page not found :(</div>;
}

export default withRouter(ErrorComponent);
