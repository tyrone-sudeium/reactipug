import { 
  withMappedNavigationProps,
  withMappedNavigationAndConfigProps 
} from "react-navigation-props-mapper"
import { StackNavigator } from "react-navigation"
import { HomeScreen } from "./home_screen"
import { PugsScreen } from "./pugs_screen"
import { PugCardScreen } from "./pug_card_screen"

export const AppNavigator = (initialRoute: string, initialRouteParams: Object) => {
  return StackNavigator({
    home: {
      screen: withMappedNavigationAndConfigProps(HomeScreen),
      path: "/"
    },
    pugs: {
      screen: withMappedNavigationAndConfigProps(PugsScreen),
      path: "/pugs?pages=:pages"
    },
    pugCard: {
      screen: withMappedNavigationAndConfigProps(PugCardScreen),
      path: "/pugs/:pugId"
    }
  }, {
    initialRouteName: initialRoute,
    initialRouteParams: initialRouteParams,
    navigationOptions: ({ navigation, props }: any)  => ({
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#8239AB"
      }
    })
  })
}
