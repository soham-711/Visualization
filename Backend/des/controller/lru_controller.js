"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlru = void 0;
const getlru = (req, res) => {
    var _a;
    let array = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
    let n = array.length;
    let frame = 3;
    let s = new Set();
    let indexes = new Map();
    let page_faults = 0;
    let result = [];
    for (let i = 0; i < n; i++) {
        let page = array[i];
        let status;
        if (s.size < frame) {
            if (!s.has(array[i])) {
                s.add(array[i]);
                page_faults++;
                status = "Miss";
            }
            else {
                status = "Hit";
            }
            indexes.set(array[i], i);
        }
        else {
            if (!s.has(array[i])) {
                let lru = Number.MAX_SAFE_INTEGER;
                let val = -1;
                for (let item of s) {
                    let idx = (_a = indexes.get(item)) !== null && _a !== void 0 ? _a : -1;
                    if (idx < lru) {
                        lru = idx;
                        val = item;
                    }
                }
                s.delete(val);
                s.add(array[i]);
                page_faults++;
                status = "Miss";
            }
            else {
                status = "Hit";
            }
            indexes.set(array[i], i);
        }
        result.push({
            page: page,
            frame: Array.from(s),
            status: status,
        });
    }
    res.json({ steps: result });
};
exports.getlru = getlru;
