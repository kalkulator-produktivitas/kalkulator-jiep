export function groupArray<T>(arr: Array<T>, num: number): Array<Array<T>> {
  if (num <= 0) {
    throw new Error('num must be > 0')
  }

  const res: Array<Array<T>> = [];
  let curr: Array<T> = [];

  for (let v of arr) {
    if (curr.length >= num) {
      res.push([ ...curr ]);
      curr = [];
    }
    curr.push(v);
  }

  if (curr.length > 0) {
    res.push([ ...curr ]);
  }

  return res;
}