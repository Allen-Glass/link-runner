import type { Collider } from "../models/collider";

const xResolution = 100;
const yResolution = 100;
let xBlockLength = 0;
let yBlockLength = 0;
let xBlockHalfLength = 0;
let yBlockHalfLength = 0

export const getCurrentPlayerHash = (domRect: DOMRect) => {
    const xLocation = domRect.left + domRect.width/2;
    const yLocation = domRect.top + domRect.height/2;
    return gridHash(xLocation, yLocation);
}

export const generateHrefHashes = (domRects: DOMRect[]): Set<number> => {
    if (!xBlockLength || !yBlockLength)
        return new Set();

    const set: Set<number> = new Set<number>();
    domRects.forEach(d => {
        const numberOfXHashes = d.width/xBlockLength;
        const numberOfYHashes = d.width/yBlockLength;
        for (let x = 0; x < numberOfXHashes; x++) {
            for (let y = 0; y < numberOfYHashes; y++) {
                const hash = gridHash(d.left + x * xBlockLength, d.top + y * yBlockLength);
                set.add(hash)
            }
        }
    });

    return set;
}

export const generatePageHashes = (scrollHeight: number, scrollWidth: number): Map<number, Collider> => {
    xBlockLength = scrollWidth/xResolution;
    yBlockLength = scrollHeight/yResolution;
    xBlockHalfLength = xBlockLength/2;
    yBlockHalfLength = yBlockLength/2;
    const hashMap = new Map<number, Collider>();
    for (let y = 0; y < yResolution; y++) {
        for (let x = 0; x < xResolution; x++) {
            const xCenter = xBlockHalfLength + xBlockLength * x;
            const yCenter = yBlockHalfLength + yBlockLength * y;
            const x1 = xBlockLength * x;
            const x2 = xBlockLength + xBlockLength * x;
            const y1 = yBlockLength * y;
            const y2 = yBlockLength + yBlockLength * y;
            const hash = gridHash(xCenter, yCenter);
            hashMap.set(hash, {x1: x1, x2: x2, y1: y1, y2: y2})
        }
    }

    return hashMap;
}

const gridHash = (x: number, y: number): number => {
    const xStr = x.toString();
    const yStr = y.toString();
  
    const separator = "_";
    const combinedStr = xStr + separator + yStr;
  
    let hash = 0;
    for (let i = 0; i < combinedStr.length; i++) {
        const charCode = combinedStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + charCode;
        hash = hash & hash;
    }
  
    return hash;
  }
  