export class Ship {
    private length: number;
    private hits: number;
    private positions: [number, number][];

    constructor(length: number, positions: [number, number][]) {
        this.length = length;
        this.hits = 0;
        this.positions = positions;
    }

    getLength(): number {
        return this.length;
    }

    getHits(): number {
        return this.hits;
    }

    getPositions(): [number, number][] {
        return this.positions;
    }

    hit(position: [number, number]): void {
        if (this.positions.some(pos => pos[0] === position[0] && pos[1] === position[1])) {
            this.hits++;
        }
    }

    isSunk(): boolean {
        return this.hits >= this.length;
    }
}