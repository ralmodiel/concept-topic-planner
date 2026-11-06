// Saving a generated file. Nothing here makes a network request.

/** Hands a generated file to the browser's own download. */
export function saveFile(bytes: Uint8Array, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.rel = 'noopener'
  document.body.append(a)
  a.click()
  a.remove()
  // iOS asks before saving: the link must outlive a slow tap.
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
