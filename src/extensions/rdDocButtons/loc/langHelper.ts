export interface ILang{
  Buttons: {
    View: string,
    Edit: string,
    Reminders: string,
    Approval: string,
    Publicize: string,
    Archivation: string,
    Delete: string
  }
}

export const getLangStrings = (locale: string): ILang => {
  switch (locale) {
    case 'sk':
      return require(/* webpackChunkName: 'lang' */'./sk.json')
    default:
      return require(/* webpackChunkName: 'lang' */'./sk.json')
  }
}
