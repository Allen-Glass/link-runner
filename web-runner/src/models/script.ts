export interface Manuscript {
    texts: Text[]
}

export interface Text {
    route: string;
    text: string;
    links: Link[];
    code?: Code;
}

export interface Link {
    text: string;
    to: string;
}

export interface Code {
    id: string;
    displayText: string;
    code: string;
    route: string;
}