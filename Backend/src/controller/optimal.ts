// import { Request, Response } from "express";

// export const getOptimal = (req: Request, res: Response): void => {
//   const array: number[] = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
//   const frameSize: number = 3;
//   const n = array.length;

//   let hit = 0;
//   let fr: number[] = [];
//   let result: {
//     page: number;
//     frame: number[];
//     status: "Hit" | "Miss";
//   }[] = [];

//   const search = (pg: number, fr: number[]): boolean => {
//     return fr.includes(pg);
//   };

//   const predict = (
//     pages: number[],
//     fr: number[],
//     totalPages: number,
//     currentIndex: number
//   ): number => {
//     let res = -1;
//     let farthest = currentIndex;

//     for (let i = 0; i < fr.length; i++) {
//       let j;
//       for (j = currentIndex; j < totalPages; j++) {
//         if (fr[i] === pages[j]) {
//           if (j > farthest) {
//             farthest = j;
//             res = i;
//           }
//           break;
//         }
//       }
//       if (j === totalPages) return i;
//     }

//     return res === -1 ? 0 : res;
//   };

//   for (let i = 0; i < n; i++) {
//     const page = array[i];
//     let status: "Hit" | "Miss";

//     if (search(page, fr)) {
//       hit++;
//       status = "Hit";
//     } else {
//       if (fr.length < frameSize) {
//         fr.push(page);
//       } else {
//         const j = predict(array, fr, n, i + 1);
//         fr[j] = page;
//       }
//       status = "Miss";
//     }

//     result.push({
//       page,
//       frame: [...fr],
//       status,
//     });
//   }

//   const misses = n - hit;

//   res.json({
//     page_faults: misses,
//     steps: result,
//   });
// };

import { Request, Response } from "express";

export const getOptimal = (req: Request, res: Response): void => {
  console.log(req.body);

  let pages: number[] = req.body.store; // List of requested pages
  let frameSize: number = req.body.frame; // Number of frames
  let n: number = pages.length; // Total page requests

  let frame: (number | null)[] = new Array(frameSize).fill(null); // Memory frames initialized to null
  let s: Set<number> = new Set(); // Current pages in memory

  let pageFaults = 0;
  let pageHits = 0;

  type ResultStep = {
    step: number;
    page: number;
    frame: (number | null)[];
    status: "Hit" | "Miss";
  };

  const result: ResultStep[] = [];

  // Function to find the index of the page that will be used farthest in the future
  const predict = (pages: number[], frame: (number | null)[], index: number): number => {
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
      if (!found) return i; // If a page is not found in the future, replace it
    }

    return replaceIndex === -1 ? 0 : replaceIndex;
  };

  for (let i = 0; i < n; i++) {
    let currentPage = pages[i];
    let status: "Hit" | "Miss";

    if (s.has(currentPage)) {
      status = "Hit";
      pageHits++;
    } else {
      status = "Miss";
      pageFaults++;

      if (s.size >= frameSize) {
        // Find the page that will be used farthest in the future and replace it
        let replaceIndex = predict(pages, frame, i + 1);
        s.delete(frame[replaceIndex]!);
        frame[replaceIndex] = currentPage;
      } else {
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
