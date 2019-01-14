const pathify = path => {
  let correctPath = path;
  if (!correctPath || typeof correctPath !== "string" || !correctPath.length)
    return "/";
  if (correctPath[0] !== "/") correctPath = `/${correctPath}`;
  if (correctPath[correctPath.length] === "/")
    correctPath = correctPath.substr(0, correctPath.length - 1);
  return correctPath;
};

export default pathify;
