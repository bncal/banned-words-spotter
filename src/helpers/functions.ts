import bannedWords from "./banned-words.json";
const regexQuantifier = /([aeiou]{2,})(?=[aeiou])/gi;


/**
 * @description hasBannedWords checks if a word or a long text contains banned words.
 * @param text text to be checked if it contains banned words
 * @returns boolean
 * 
 * @example hasBannedWords("Badword");
 * Output: true
 */
const hasBannedWords = (text: string): boolean =>{
    if(text.length == 0) { return false; }

    if(text.length > 1) {
        const words: string[] = text.split(" ");

        for(let i = 0; i < words.length; i++) {
            
            const qCleaned = words[i].replace(regexQuantifier, "");
            if(bannedWords.words.includes(qCleaned)) {
                return true;
            }

            if(bannedWords.words.includes(words[i])) {
                return true;
            }
        }
    }

    return false;
}

/**
 * @description redactBannedWords redacts banned words in a text and/or long text.
 * @param text text to be redacted
 * @param censor (optional) string to replace the banned word with. Default is "*****"
 * @returns text with banned words replaced with censor.
 * 
 * @example redactBannedWords("Leave this badword outta my badwording face!");
 * Output: Leave this ***** outta my ***** face!
 * 
 * @example redactBannedWords("Leave this badword outta my badwording face!", "[REDACTED]");
 * Output: Leave this [REDACTED] outta my [REDACTED] face! 
 * 
 */
const redactBannedWords = (text: string, censor: string = "******"): string => {
    if(text.length == 0) { return "err no string"; }

    if(text.length > 1) {
        const words: string[] = text.split(" ");

        words.forEach((word, i) => {
            if (hasBannedWords(word)) {
                words[i] = censor;
            }
        });
    
        return words.join(" ");
    }
    
    return text;
}

export {
    hasBannedWords, 
    redactBannedWords
};