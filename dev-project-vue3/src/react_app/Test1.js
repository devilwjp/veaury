import React from 'react'
import {observer, inject} from 'mobx-react'
import {injectIntl} from 'react-intl'

const AllApps = inject('appState')(observer(() => {
  return <div>xxxxxxxxxxx</div>
}))

export default injectIntl(AllApps)
