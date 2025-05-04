export const truncateText = (text: string, length: number) => {
  // Remove Markdown symbols using a regex
  const plainText = text
    .replace(/[#_*~`>[\]()\-+!]/g, '') // Remove Markdown symbols
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove Markdown links but keep the text
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Remove image syntax but keep the alt text
  return plainText.length > length
    ? `${plainText.slice(0, length)}...`
    : plainText
}
