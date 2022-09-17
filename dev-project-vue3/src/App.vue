<template>
  <div>
<!--    <router-view/>-->
    <IntlProvider :messages="messagesInFrench" locale="fr" defaultLocale="en">
      <Provider  appState="1212" >
        <Test1/>
      </Provider>
    </IntlProvider>
  </div>
</template>

<script>
import Test1 from "./react_app/Test1";
import {IntlProvider} from 'react-intl'
import {Provider} from 'mobx-react'
import {applyPureReactInVue} from 'veaury'
export default {
  name: 'App',
  data() {
    return {
      messagesInFrench: {
        myMessage: "Aujourd'hui, c'est le {ts, date, ::yyyyMMdd}",
      }
    }
  },
  components: {
    Test1: applyPureReactInVue(Test1),
    IntlProvider: applyPureReactInVue(IntlProvider),
    Provider: applyPureReactInVue(Provider)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
