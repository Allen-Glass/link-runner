import type { Collider, Collision } from "../models/collider";

const colliderOverlapResolution = 2; //within 5 pixels mark as collided

export const IsOverlappingCollider = (playerBounds: DOMRect, colliders: Collider[]): Collision => {
    let xAxisCollisionPositive = false;
    let xAxisCollisionNegative = false;
    let yAxisCollisionPositive = false;
    let yAxisCollisionNegative = false;

    colliders.forEach(c => {
        const yAxisCollision = (playerBounds.top < c.y2 && playerBounds.top > c.y1) || (playerBounds.bottom > c.y1 && playerBounds.bottom < c.y2)
        xAxisCollisionPositive = xAxisCollisionPositive || ((Math.abs(c.x1 - playerBounds.left) < colliderOverlapResolution)
            && yAxisCollision);
        xAxisCollisionNegative = xAxisCollisionNegative || ((Math.abs(c.x2 - playerBounds.right) < colliderOverlapResolution)
            && yAxisCollision);

        const xAxisCollision = (playerBounds.left < c.x2 && playerBounds.left > c.x1) || (playerBounds.right > c.x1 && playerBounds.right < c.x2)
        yAxisCollisionPositive = yAxisCollisionPositive || ((Math.abs(c.y1 - playerBounds.bottom) < colliderOverlapResolution)
            && xAxisCollision);
        yAxisCollisionNegative = yAxisCollisionNegative || ((Math.abs(c.y2 - playerBounds.top) < colliderOverlapResolution)
            && xAxisCollision);
    });
    if (xAxisCollisionPositive)
        console.log('xAxisCollisionPositive')
    if (xAxisCollisionNegative)
        console.log('xAxisCollisionNegative')
    if (yAxisCollisionPositive)
        console.log('yAxisCollisionPositive')
    if (yAxisCollisionNegative)
        console.log('yAxisCollisionNegative')

    return {
        xAxisCollisionPositive: xAxisCollisionPositive,
        xAxisCollisionNegative: xAxisCollisionNegative,
        yAxisCollisionPositive: yAxisCollisionPositive,
        yAxisCollisionNegative: yAxisCollisionNegative
    };
}