export const extractFromText = (text: string, regex: RegExp) => {
  try {
    const extracted = text.match(regex);
    return extracted[extracted.length - 1];
  } catch (err) {
    console.log(err);
  }
};