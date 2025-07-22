const truncate = (str: string, max: number) =>
  str.length > max ? str.slice(0, max - 1) + "…" : str;

const truncateLabel = (label: string) => {
  const maxLength = 12;
  if (!label) return "";

  const words = label.split(" ");
  if (words.length === 1) return truncate(words[0], maxLength);

  const first = words[0];
  const second = words[1];

  const combined = `${first} ${second}`;
  if (combined.length <= maxLength) return combined;

  return truncate(first, maxLength);
};

export default truncateLabel;
