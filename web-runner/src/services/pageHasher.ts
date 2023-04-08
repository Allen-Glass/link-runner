import type { Collider } from "../models/collider";

const xBlockLength = 50; //50 px
const yBlockLength = 50; //50 px

export const getCurrentPlayerHash = (domRect: DOMRect) => {
    const xLocation = Math.floor(domRect.left/xBlockLength);
    const yLocation = Math.floor(domRect.top/yBlockLength);
    return gridHash(xLocation, yLocation);
}

export const generatePageHashes = (scrollHeight: number, scrollWidth: number): Map<number, Collider[]> => {
    const xBlockCount = Math.ceil(scrollHeight/xBlockLength);
    const yBlockCount = Math.ceil(scrollWidth/yBlockLength);
    const hashMap = new  Map<number, Collider[]>;
    for (let y = 0; y < yBlockCount; y++) {
        for (let x = 0; x < xBlockCount; x++) {
            const hash = gridHash(x, y);
            hashMap.set(hash, [{
                x1: x * xBlockLength,
                x2: (x + 1) * xBlockLength,
                y1: y * yBlockLength,
                y2: (y + 1) * yBlockLength
            }]);
        }
    }

    return hashMap;
}

export const generateHrefHashes = (domRects: DOMRect[]): Map<number, Collider[]> => {
    const map: Map<number, Collider[]> = new Map<number, Collider[]>();
    domRects.forEach(d => {
        const numberOfXGridsCrossed = Math.floor((d.right / xBlockLength)) - Math.floor((d.left / xBlockLength));
        const numberOfYGridsCrossed = Math.floor((d.bottom / yBlockLength)) - Math.floor((d.top / yBlockLength));
        const x = Math.floor(d.left/50);
        const y = Math.floor(d.top/50);
        let i = -1;
        let j = -1;
        do 
        {
            j = -1;
            i++;
            do {
                j++;
                const nextGridHash = gridHash(x + i, y + j);
                const xOffset = d.left;
                const yOffset = d.top;
                const left = i === 0
                    ? d.left //takes it original location
                    : xBlockLength * i + xOffset;
                const right = i === numberOfXGridsCrossed
                    ? d.right //width takes full grid
                    : xBlockLength * (i + 1) + xOffset //stops in middle of grid;
                const top = j === 0
                    ? d.top
                    : yBlockLength * j + yOffset;
                const bottom = j === numberOfYGridsCrossed
                    ? d.bottom
                    : yBlockLength * (j + 1) + yOffset;

                const collider: Collider = {x1: left, x2: right, y1: top, y2: bottom};
                if (map.has(nextGridHash)) {
                    const existingColliders = map.get(nextGridHash) ?? [];
                    existingColliders.push(collider);
                    map.set(nextGridHash, existingColliders);
                } else {
                    map.set(nextGridHash, [collider])
                }
                    
            } while (j < numberOfYGridsCrossed)
        } while (i < numberOfXGridsCrossed)
    });

    return map;
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
  