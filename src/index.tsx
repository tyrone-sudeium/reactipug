import * as React from "react"
import { AppNavigator } from "./app_navigation"
import { NavigationState } from "react-navigation"
import { Settings } from "react-native"

function getCurrentRoute(navigationState: NavigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routers) {
    return getCurrentRoute(route)
  }
  return route
}

export const RootNavigator = AppNavigator("home", {})

export class MainApplication extends React.Component<{}, {}> {

  render(): JSX.Element {
    try {
      const storedState = JSON.parse(Settings.get("navigationState"))
      if (storedState) {
        RootNavigator.state = storedState
      }
    } catch (err) {}
    return <RootNavigator onNavigationStateChange={(prevState, currentState) => {
      const data = RootNavigator.router.getPathAndParamsForState(currentState)
      Settings.set({
        routePath: data.path,
        routeParams: JSON.stringify(data.params),
        navigationState: JSON.stringify(currentState)
      })
    }}/>
  }
}
