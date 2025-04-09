import { Request,Response } from "express"


export const getfifo=(req:Request,res:Response):void=>{
let page:number[]=[7,0,1,2,0,3,0,4,2,3,0,3,2]
let n=page.length;
 let frame=3;
let s:Set<number>=new Set();
let page_faults=0;
const queue:number[]=[];
type result_step={
    page:number,
    frame:number[],
    status:"Hit"|"Miss"
}
const result:result_step[]=[];
for(let i=0;i<n;i++){
    const pages=page[i];
    let status:"Hit"|"Miss";
    if(s.has(page[i])){
        status="Hit";
    }else{
        page_faults++;
 status="Miss";
    }

    if(s.size<frame){
        s.add(page[i]);
        queue.push(page[i]);
    }
    else{
        const oldest=queue.shift();
        if (oldest !== undefined) s.delete(oldest);
        s.add(pages);
        queue.push(pages)
    }

    result.push({
        page:pages,
        frame:[...queue],
        status
    })
}
res.json({
   
    steps: result,
  });

}