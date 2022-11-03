
/*const consoleLoggerStyles = [
    'color: #fac023',
    'background: transparent',
    'border: 1px solid #fac023',
    'font-weight:600;',
    'box-shadow: 2px 2px black',
    'border-radius: 5px;',
    'padding: 2px 5px',
].join(';')*/

export default ({ app }, inject) => {
  inject('lang', {
    get (obj, key) {
        if (!obj || !key) return null

        try {
            const languageCode = app.i18n.localeProperties.code
            if (languageCode === 'en') {
                return obj[key]
            }
            else if (obj.language[languageCode][key] === null || obj.language[languageCode][key] === undefined) {
                return obj[key]
            }
            return obj.language[languageCode][key]
        } catch {
            return obj[key]
        }
    }
  })
}
