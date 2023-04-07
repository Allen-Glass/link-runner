export type Collider = {
    x1: number;
    x2: number;
    y1: number
    y2: number;
}

export type Collision = {
    yAxisCollisionPositive: boolean;
    yAxisCollisionNegative: boolean;
    xAxisCollisionPositive: boolean;
    xAxisCollisionNegative: boolean;
}