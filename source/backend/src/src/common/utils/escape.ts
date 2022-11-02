export const like = (raw: string): string => {
  return raw.replace(/[\\%_]/g, "\\$&");
};
