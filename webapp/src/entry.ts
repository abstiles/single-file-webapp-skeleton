import "skeleton-css/css/normalize.css"
import "skeleton-css/css/skeleton.css"
import "./style.css";
import content from "./content.ts"
document.addEventListener("DOMContentLoaded",
    event => document.body.appendChild(content));
