import { italian } from 'locales/italian'

const replacer = (string = '', props = {}) =>
  string
    .replace(/{{[a-zA-Z0-9.]*}}/g, match => !match.includes('.')
      ? props[match.replace(/{|}/g, '')] ?? match
      : match.replace(/{|}/g, '').split('.').reduce((prev, curr) => prev?.[curr] ?? null, props) ??
        match)
class Translator {
  constructor() {
    this.language = italian
    this.unmatchedLabels = new Set()
    this.printUnmatchedLabels = false // set to true to debug missing label
  }

  setLanguage = (language) => {
    this.language = language
  }

  fromLabel = (label, props) => {
    if (this.language[label] != null)
      return props != null ? replacer(this.language[label], props) : this.language[label]

    if (this.printUnmatchedLabels) {
      this.unmatchedLabels.add(label)
      console.log('unmatchedLabels', this.unmatchedLabels)
    }
    return props != null ? JSON.stringify({ label, ...props }) : label
  }

  fromLabelNoFallback = (label, props) => {
    if (this.language[label] != null)
      return props != null ? replacer(this.language[label], props) : this.language[label]

    if (this.printUnmatchedLabels) {
      this.unmatchedLabels.add(label)
      console.log('unmatchedLabels', this.unmatchedLabels)
    }
    return null
  }

  toPrice = price => {
    price = Number.isNaN(price) ? 0 : Number(price)

    if (this.language.toPrice != null)
      return this.language.toPrice(price)
    else
      return price
  }
}

export default new Translator()
