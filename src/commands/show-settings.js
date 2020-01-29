const { getActionTranslations } = require('../intl.js')
const { createArgWithAction } = require('../utils.js')
const { favoritesOperations } = require('../const.js')

exports.showSettingsMenu = () => {
  const {
    action: importAction,
    actionTip: importActionTip
  } = getActionTranslations('import', 'en')
  /*const {
    action: exportAction,
    actionTip: exportActionTip
  } = getActionTranslations('export', 'en')*/

  return [
    {
      title: importAction,
      subtitle: importActionTip,
      icon: { path: 'icons/import.png' },
      arg: createArgWithAction(favoritesOperations.IMPORT)
    }
    /*{
      title: exportAction,
      subtitle: exportActionTip,
      icon: { path: 'icons/export.png' },
      arg: createArgWithAction(favoritesOperations.EXPORT)
    }*/
  ]
}
