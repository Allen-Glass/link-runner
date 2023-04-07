import type { Collider, Collision } from "../models/collider";

const colliderOverlapResolution = 2; //within 5 pixels mark as collided

export const IsOverlappingCollider = (playerBounds: DOMRect, colliders: Collider[]): Collision => {
    let xAxisCollisionPositive = false;
    let xAxisCollisionNegative = false;
    let yAxisCollisionPositive = false;
    let yAxisCollisionNegative = false;

    colliders.forEach(c => {
        xAxisCollisionPositive = xAxisCollisionPositive || (Math.abs(c.x1 - playerBounds.left) < colliderOverlapResolution)
            && (c.y1 < playerBounds.top && c.y2 > playerBounds.bottom);
        xAxisCollisionNegative = xAxisCollisionNegative || (Math.abs(c.x2 - playerBounds.right) < colliderOverlapResolution)
            && (c.y1 < playerBounds.top && c.y2 > playerBounds.bottom);

        yAxisCollisionPositive = yAxisCollisionPositive || (Math.abs(c.y1 - playerBounds.bottom) < colliderOverlapResolution)
            && (c.x1 < playerBounds.right && c.x2 > playerBounds.left);
        yAxisCollisionNegative = yAxisCollisionNegative || (Math.abs(c.y2 - playerBounds.top) < colliderOverlapResolution)
            && (c.x1 < playerBounds.right && c.x2 > playerBounds.left);
    });
    return {
        xAxisCollisionPositive: xAxisCollisionPositive,
        xAxisCollisionNegative: xAxisCollisionNegative,
        yAxisCollisionPositive: yAxisCollisionPositive,
        yAxisCollisionNegative: yAxisCollisionNegative
    };
}