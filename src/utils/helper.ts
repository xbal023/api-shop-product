export const randomString = (value: number): string => {
	let rdm = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
	let result: string = '';
   const cr: number = rdm.length;
   let counter: number = 0;
    while (counter < cr) {
      result += rdm.charAt(Math.floor(Math.random() * cr));
      counter += 1;
    }
    return result;
}