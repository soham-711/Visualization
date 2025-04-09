
import { Request, Response } from "express";

export const getlru = (req: Request, res: Response):void => {
  let array: number[] = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];
  let n: number = array.length;
  let frame = 3;
  let s: Set<number> = new Set();
  let indexes: Map<number, number> = new Map();
  let page_faults: number = 0;
  type result_str = {
    page: number;
    frame: number[];
    status: "Hit" | "Miss";
  };
  let result: result_str[] = [];
  for (let i = 0; i < n; i++) {
    let page = array[i];
    let status: "Hit" | "Miss";
    if (s.size < frame) {
      if (!s.has(array[i])) {
        s.add(array[i]);
        page_faults++;
        status = "Miss";
      } else {
        status = "Hit";
      }
      indexes.set(array[i], i);
    } else {
      if (!s.has(array[i])) {
        let lru = Number.MAX_SAFE_INTEGER;
        let val = -1;
        for (let item of s) {
          let idx = indexes.get(item) ?? -1;
          if (idx < lru) {
            lru = idx;
            val = item;
          }
        }
        s.delete(val);
        s.add(array[i]);
        page_faults++;
        status = "Miss";
      } else {
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