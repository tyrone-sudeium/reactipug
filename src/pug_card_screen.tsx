import * as React from "react"
import {
  NavigationScreenProps
} from "react-navigation"


export class PugCardPage extends React.Component<NavigationScreenProps<{}>, {}> {

}

export const PugCardScreen: React.SFC<NavigationScreenProps<{}>> = (props) =>
  <PugCardPage navigation={props.navigation}/>
