"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getfifo = void 0;
const getfifo = (req, res) => {
    let page = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
    let n = page.length;
    let frame = 3;
    let s = new Set();
    let page_faults = 0;
    const queue = [];
    const result = [];
    for (let i = 0; i < n; i++) {
        const pages = page[i];
        let status;
        if (s.has(page[i])) {
            status = "Hit";
        }
        else {
            page_faults++;
            status = "Miss";
        }
        if (s.size < frame) {
            s.add(page[i]);
            queue.push(page[i]);
        }
        else {
            const oldest = queue.shift();
            if (oldest !== undefined)
                s.delete(oldest);
            s.add(pages);
            queue.push(pages);
        }
        result.push({
            page: pages,
            frame: [...queue],
            status
        });
    }
    res.json({
        steps: result,
    });
};
exports.getfifo = getfifo;
