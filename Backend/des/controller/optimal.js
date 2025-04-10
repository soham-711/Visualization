"use strict";
// import { Request, Response } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptimal = void 0;
const getOptimal = (req, res) => {
    console.log(req.body);
    let pages = req.body.store; // List of requested pages
    let frameSize = req.body.frame; // Number of frames
    let n = pages.length; // Total page requests
    let frame = new Array(frameSize).fill(null); // Memory frames initialized to null
    let s = new Set(); // Current pages in memory
    let pageFaults = 0;
    let pageHits = 0;
    const result = [];
    // Function to find the index of the page that will be used farthest in the future
    const predict = (pages, frame, index) => {
        let farthest = -1;
        let replaceIndex = -1;
        for (let i = 0; i < frame.length; i++) {
            let found = false;
            for (let j = index; j < n; j++) {
                if (frame[i] === pages[j]) {
                    if (j > farthest) {
                        farthest = j;
                        replaceIndex = i;
                    }
                    found = true;
                    break;
                }
            }
            if (!found)
                return i; // If a page is not found in the future, replace it
        }
        return replaceIndex === -1 ? 0 : replaceIndex;
    };
    for (let i = 0; i < n; i++) {
        let currentPage = pages[i];
        let status;
        if (s.has(currentPage)) {
            status = "Hit";
            pageHits++;
        }
        else {
            status = "Miss";
            pageFaults++;
            if (s.size >= frameSize) {
                // Find the page that will be used farthest in the future and replace it
                let replaceIndex = predict(pages, frame, i + 1);
                s.delete(frame[replaceIndex]);
                frame[replaceIndex] = currentPage;
            }
            else {
                // Find first empty slot
                let emptyIndex = frame.indexOf(null);
                if (emptyIndex !== -1) {
                    frame[emptyIndex] = currentPage;
                }
            }
            s.add(currentPage);
        }
        // Store step with the current frame state
        result.push({
            step: i + 1,
            page: currentPage,
            frame: [...frame], // Copy the frame state
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
exports.getOptimal = getOptimal;
