// The Word file's parts, written as WordprocessingML and zipped with fflate: runs, paragraphs and
// the package around them.
import { strToU8, zipSync } from 'fflate'

// XML 1.0 also forbids U+FFFE and U+FFFF (Word then calls the whole file corrupted). Word joiners
// (U+2060, keeping page ranges on one line on screen) go too: Arial has no glyph for them.
export const esc = (s: string) =>
  [...s]
    // control characters (C0 but tab and line breaks), which XML 1.0 never carries
    .filter((c) => c.charCodeAt(0) >= 0x20 || '\t\n\r'.includes(c))
    .join('')
    .replace(/\p{Noncharacter_Code_Point}|\u2060/gu, '')
    .replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

interface RunOpts {
  bold?: boolean
  italic?: boolean
  size?: number
  color?: string
}
export const run = (text: string, o: RunOpts = {}) =>
  `<w:r><w:rPr>${o.bold ? '<w:b/>' : ''}${o.italic ? '<w:i/>' : ''}${o.color ? `<w:color w:val="${o.color}"/>` : ''}${o.size ? `<w:sz w:val="${o.size * 2}"/><w:szCs w:val="${o.size * 2}"/>` : ''}</w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`

interface ParaOpts {
  before?: number
  after?: number
  indent?: number
  hanging?: number
  keepNext?: boolean
  shade?: string
}
export const para = (runs: string, o: ParaOpts = {}) =>
  `<w:p><w:pPr>${o.keepNext ? '<w:keepNext/>' : ''}${o.shade ? `<w:shd w:val="clear" w:color="auto" w:fill="${o.shade}"/>` : ''}<w:spacing w:before="${(o.before ?? 0) * 20}" w:after="${(o.after ?? 6) * 20}" w:line="276" w:lineRule="auto"/>${o.indent || o.hanging ? `<w:ind w:left="${(o.indent ?? 0) * 20}" w:hanging="${(o.hanging ?? 0) * 20}"/>` : ''}</w:pPr>${runs}</w:p>`

/** Paragraphs (and tables) as a Word file: A4, Arial 11 pt. */
export function docxFile(body: string[], title: string): Uint8Array {
  const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="${W}"><w:body>${body.join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="${W}"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial" w:eastAsia="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="en-PH"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>`
  const files = {
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`,
    'word/_rels/document.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    'word/document.xml': document,
    'word/styles.xml': styles,
    'docProps/core.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${esc(title)}</dc:title><dc:creator>Topic Planner</dc:creator></cp:coreProperties>`,
  }
  return zipSync(Object.fromEntries(Object.entries(files).map(([k, v]) => [k, strToU8(v)])), {
    level: 6,
  })
}
