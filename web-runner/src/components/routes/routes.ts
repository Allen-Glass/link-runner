export interface Route {
    hash: string;
    component: any;
}

export const routes: Route[] = [{
    hash: "welcome",
    component: Welcome
}, {
    hash: "",
    component: Welcome
}, {
    hash: "movement",
    component: Movement
},