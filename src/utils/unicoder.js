export const UnicodeDecoder = ({ encodedText }) => {
  const decodedText = encodedText.replace(
    /\\u([\dA-F]{4})/gi,
    (match, p1) => String.fromCharCode(parseInt(p1, 16))
  );
  return <div>{decodedText}</div>;
};
