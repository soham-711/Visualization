import { Request, Response } from "express";

export const getfifo = (req: Request, res: Response): void => {
    console.log(req.body);
  
    let page: number[] = req.body.store;
    let frame = req.body.frame;
    let n = page.length;
  
    let s: Set<number> = new Set();
    let queue: number[] = [];
    let page_faults = 0;
    let page_hits = 0; // Track hits
  
    type result_step = {
      page: number;
      frame: (number | string)[]; // Store numbers or empty strings
      status: "Hit" | "Miss";
    };
  
    const result: result_step[] = [];
  
    for (let i = 0; i < n; i++) {
      let pages = page[i];
      let status: "Hit" | "Miss";
  
      if (s.has(pages)) {
        // If page is already in memory -> HIT
        status = "Hit";
        page_hits++;
      } else {
        // If page is NOT in memory -> MISS
        status = "Miss";
        page_faults++;
  
        if (s.size >= frame) {
          // Remove the oldest page (FIFO)
          const oldest = queue.shift();
          if (oldest !== undefined) s.delete(oldest);
        }
  
        // Add new page
        s.add(pages);
        queue.push(pages);
      }
  
      // Fill empty slots in the frame representation
      let frameState: (number | string)[] = new Array(frame).fill("");
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
  