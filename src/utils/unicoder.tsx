export const UnicodeDecoder = ({ encodedText }: { encodedText: string }) => {
  const decodedText = encodedText.replace(/\\u([\dA-F]{4})/gi, (_match, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  )
  return <div>{decodedText}</div>
}
