"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getfifo = void 0;
const getfifo = (req, res) => {
    console.log(req.body);
    let page = req.body.store;
    let frame = req.body.frame;
    let n = page.length;
    let s = new Set();
    let queue = [];
    let page_faults = 0;
    let page_hits = 0; // Track hits
    const result = [];
    for (let i = 0; i < n; i++) {
        let pages = page[i];
        let status;
        if (s.has(pages)) {
            // If page is already in memory -> HIT
            status = "Hit";
            page_hits++;
        }
        else {
            // If page is NOT in memory -> MISS
            status = "Miss";
            page_faults++;
            if (s.size >= frame) {
                // Remove the oldest page (FIFO)
                const oldest = queue.shift();
                if (oldest !== undefined)
                    s.delete(oldest);
            }
            // Add new page
            s.add(pages);
            queue.push(pages);
        }
        // Fill empty slots in the frame representation
        let frameState = new Array(frame).fill("");
        queue.forEach((value, index) => (frameState[index] = value));
        // Store step
        result.push({
            page: pages,
            frame: frameState, // Updated to correctly show empty slots
            status,
        });
    }
    console.log(result);
    res.json({
        steps: result,
        pageHits: page_hits,
        pageMisses: page_faults,
        hitRatio: (page_hits / n) * 100, // Percentage hit ratio
    });
};
exports.getfifo = getfifo;
