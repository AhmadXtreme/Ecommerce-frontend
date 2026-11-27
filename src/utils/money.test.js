import { formatPrice } from "./money";
import { describe, it, expect } from "vitest";

describe('test formatPrice function', () => {

    it('is 1899 equal to the $18.99', () => {
        expect(formatPrice(1899)).toBe('$18.99');
    });

    it('1090 cents equal to $10.90', () => {
        expect(formatPrice(1090)).toBe('$10.90');
    });
});
