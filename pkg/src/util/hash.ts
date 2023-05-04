export const hash = (text:string, key = "") => {
    const str = key + text;

    let hash = 5381;
    let index = str.length;
    
    while (index) {
      hash = (hash * 33) ^ str.charCodeAt(--index);
    }
  
    return hash >>> 0;
}