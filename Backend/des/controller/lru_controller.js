"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlru = void 0;
const getlru = (req, res) => {
    console.log(req.body);
    let pages = req.body.store; // List of requested pages
    let frameSize = req.body.frame; // Number of frames
    let n = pages.length; // Total page requests
    let frame = new Array(frameSize).fill(null); // Memory frames initialized to null
    let pageMap = new Map(); // Page access history
    let pageFaults = 0;
    let pageHits = 0;
    const result = [];
    for (let i = 0; i < n; i++) {
        let currentPage = pages[i];
        let status;
        if (pageMap.has(currentPage)) {
            // Page is in memory (Hit)
            status = "Hit";
            pageHits++;
        }
        else {
            // Page is not in memory (Miss)
            status = "Miss";
            pageFaults++;
            if (pageMap.size >= frameSize) {
                // Find the least recently used (LRU) page
                let lruPage = [...pageMap.entries()].reduce((a, b) => (a[1] < b[1] ? a : b))[0];
                pageMap.delete(lruPage);
                // Replace LRU page in frame
                let lruIndex = frame.indexOf(lruPage);
                if (lruIndex !== -1) {
                    frame[lruIndex] = currentPage;
                }
            }
            else {
                // Find the first empty frame
                let emptyIndex = frame.indexOf(null);
                if (emptyIndex !== -1) {
                    frame[emptyIndex] = currentPage;
                }
            }
            pageMap.set(currentPage, i); // Update last used index
        }
        // Update the map for recently used page
        pageMap.set(currentPage, i);
        // Store step-by-step result
        result.push({
            step: i + 1,
            page: currentPage,
            frame: [...frame],
            status,
        });
    }
    console.log(result);
    res.json({
        steps: result,
        pageHits: pageHits,
        pageMisses: pageFaults,
        hitRatio: ((pageHits / n) * 100).toFixed(2) + "%",
    });
};
exports.getlru = getlru;
