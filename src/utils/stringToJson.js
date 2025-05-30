





const categories = [
    "Properties Opportunity",
    "Watches",
    "Technology",
    "Architecture",
    "Sports & Esports",
    "Photograph",
    "Music",
    "Beauty",
    "Cuisine",
    "Fashion",
    "Automobile",
    "Long Form",
    "Environmental Movement",
    "WWK Video",
    "WWK News",
    "Hospitality Business News",
    "W Coffee Talk",
    "Inspiration Journey",
    "Tips & Advice",
    "The Art Corner",
    "Explore",
    "Enjoy",
    "Jewelry"
  ]
  
  


export const stringToJson = (textString) =>{
    const lines = textString.trim().split('\n').filter(line => line.trim() !== '');
    const jsonArray = [];
    let currentBlock = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        const matchingCategory = categories.find(cat => line.startsWith(cat));
        
        if (matchingCategory) {
            if (currentBlock && currentBlock.url && currentBlock.des) {
                jsonArray.push(currentBlock);
            }
            
            const title = line.replace(matchingCategory, '').trim();
            currentBlock = {
                cate: matchingCategory,
                title: title
            };
        } else if (currentBlock) {
            if (!currentBlock.url && line.startsWith('https://')) {
                currentBlock.url = line;
            } else if (currentBlock.url && !currentBlock.des) {
                currentBlock.des = line;
            }
        }
    }

    if (currentBlock && currentBlock.url && currentBlock.des) {
        jsonArray.push(currentBlock);
    }

    return jsonArray;
}
