import { english } from './locales'

const replacer = (string = '', props: Record<string, string> = {}) =>
  string.replace(/{{[a-zA-Z0-9._]*}}/g, match =>
    !match.includes('.')
      ? props[match.replace(/{|}/g, '')] ?? match
      : match
          .replace(/{|}/g, '')
          .split('.')
          .reduce((prev: Record<string, string> | string, curr: string) => {
            if (!prev) return props[curr]
            if (typeof prev === 'string') return prev
            return prev?.[curr] ?? ''
          }, '') ?? match,
  )

class Translator {
  language: Record<string, string> = english
  languageString: string = 'en'
  unmatchedLabels: Set<unknown>
  printUnmatchedLabels: boolean

  constructor(browserLang?: string) {
    this.setBrowserLanguage(browserLang)
    this.unmatchedLabels = new Set()
    this.printUnmatchedLabels = false // set to true to debug missing label
  }

  setBrowserLanguage = (browserLang?: string) => {
    switch (browserLang) {
      default:
        this.language = english
        this.languageString = 'en'
        break
    }
  }

  getLanguageString = (): string => this.languageString

  setLanguage = (languageString: string) => {
    if (languageString === 'en') this.language = english
    else throw new Error('Language not found')
    this.languageString = languageString
  }

  fromLabel = (label: string, props?: Record<string, string>) => {
    if (this.language[label])
      if (this.language[label] != null)
        return props != null ? replacer(this.language[label], props) : this.language[label]

    if (this.printUnmatchedLabels) {
      this.unmatchedLabels.add(label)
      console.log('unmatchedLabels', this.unmatchedLabels)
    }
    return props != null ? JSON.stringify({ label, ...props }) : label
  }

  fromLabelNoFallback = (label: string, props?: Record<string, string>) => {
    if (this.language[label] != null)
      return props != null ? replacer(this.language[label], props) : this.language[label]

    if (this.printUnmatchedLabels) {
      this.unmatchedLabels.add(label)
      console.log('unmatchedLabels', this.unmatchedLabels)
    }
    return null
  }

  getLanguageTab = () => this.language
}

export const translator = new Translator()

export const trlb = translator.fromLabel
export const setAppLanguage = translator.setLanguage
export const getLanguage = translator.getLanguageString
export const setLanguage = translator.setLanguage
