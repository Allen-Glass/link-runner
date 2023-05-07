export interface Manuscript {
    texts: Text[]
}

export interface Text {
    route: string;
    text: string;
    links: Link[]
}

export interface Link {
    text: string;
    to: string;
}