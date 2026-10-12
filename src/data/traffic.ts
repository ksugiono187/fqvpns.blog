export function estimateTraffic(capacity:number,multiplier:number,daily:number,price:number){
 if(![capacity,multiplier,daily,price].every(Number.isFinite)||capacity<=0||multiplier<=0||daily<=0||price<0)return null;
 const usable=capacity/multiplier;const result={usable,days:usable/daily,monthly:daily*30*multiplier,cost:price/usable};return Object.values(result).every(Number.isFinite)&&usable>0?result:null;
}
