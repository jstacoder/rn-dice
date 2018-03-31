import React, { Component } from 'react';
// import SvgUri from 'react-native-svg-uri'
// import Logo from './logo.svg'

import {
  AppContainer,
  AppHeader,
  AppTitle,
  AppIntro,
} from './Containers'

import { AppGame } from './AppGame'

class App extends Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          {/* <SvgUri svgXmlData={Logo} height={85} width={65} /> */}
          <AppTitle>Welcome to a React app</AppTitle>

        </AppHeader>
        <AppIntro>
          To get started, edit src/App.js and save to reload.
        </AppIntro>
        <AppGame />
      </AppContainer>
    );
  }
}

export default App;
