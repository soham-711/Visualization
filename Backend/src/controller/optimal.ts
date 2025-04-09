import { Request, Response } from "express";

export const getOptimal = (req: Request, res: Response): void => {
  const array: number[] = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
  const frameSize: number = 3;
  const n = array.length;

  let hit = 0;
  let fr: number[] = [];
  let result: {
    page: number;
    frame: number[];
    status: "Hit" | "Miss";
  }[] = [];

  const search = (pg: number, fr: number[]): boolean => {
    return fr.includes(pg);
  };

  const predict = (
    pages: number[],
    fr: number[],
    totalPages: number,
    currentIndex: number
  ): number => {
    let res = -1;
    let farthest = currentIndex;

    for (let i = 0; i < fr.length; i++) {
      let j;
      for (j = currentIndex; j < totalPages; j++) {
        if (fr[i] === pages[j]) {
          if (j > farthest) {
            farthest = j;
            res = i;
          }
          break;
        }
      }
      if (j === totalPages) return i;
    }

    return res === -1 ? 0 : res;
  };

  for (let i = 0; i < n; i++) {
    const page = array[i];
    let status: "Hit" | "Miss";

    if (search(page, fr)) {
      hit++;
      status = "Hit";
    } else {
      if (fr.length < frameSize) {
        fr.push(page);
      } else {
        const j = predict(array, fr, n, i + 1);
        fr[j] = page;
      }
      status = "Miss";
    }

    result.push({
      page,
      frame: [...fr],
      status,
    });
  }

  const misses = n - hit;

  res.json({
    page_faults: misses,
    steps: result,
  });
};
