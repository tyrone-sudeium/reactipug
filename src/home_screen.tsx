import * as React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Slider
} from "react-native"

import {
  Container,
  Body,
  Title,
  Content,
  Button,
  Icon,
  Spinner
} from "native-base"

import {
  NavigationScreenProps
} from "react-navigation"

// interface PugPageSliderProps {
//   pages: number, 
//   onValueChange: (newVal: number) => any
// }

// const PugPageSlider: React.SFC<PugPageSliderProps> = (props) => {
//   return (
//     <View style={{paddingHorizontal: 8, flexDirection: "row", alignItems: "center", flex: 1}}>
//       <Icon name="paw" style={{paddingHorizontal: 8, fontSize: 16}}/>
//       <Slider minimumValue={1} 
//         maximumValue={10}
//         value={props.pages}
//         step={1}
//         onValueChange={props.onValueChange}
//         style={{flex: 1}}
//       />
//       <Icon name="paw" style={{paddingHorizontal: 8, fontSize: 24}}/>
//       <Text style={{fontWeight: "bold"}}>
//         {props.pages}
//       </Text>
//     </View>
//   )
// }

interface HomeScreenState {
  pugPages: number
}

export class HomeScreen extends React.Component<NavigationScreenProps<{}>, HomeScreenState> {
  static navigationOptions = () => ({
    title: "Reactipug"
  })

  constructor(props: any) {
    super(props)
    this.state = {
      pugPages: 1
    }
  }

  setPugPages(newValue: number) {
    this.setState({pugPages: newValue})
  }

  showMePuppers() {
    this.props.navigation.navigate("pugs", {
      pages: this.state.pugPages
    })
  }

  render(): JSX.Element {
    return (
      <Container>
        <Content padder>
          <View style={{padding: 20, alignItems: "center"}}>
            <Image source={require("./img/pug.png")}/>
          </View>
          <View style={{backgroundColor: "white", paddingBottom: 8}}>
            <Text style={{fontWeight: "bold", paddingHorizontal: 8, paddingVertical: 8}}>Pug pages</Text>
            <View style={{paddingHorizontal: 8, flexDirection: "row", alignItems: "center", flex: 1}}>
              <Icon name="paw" style={{paddingHorizontal: 8, fontSize: 16}}/>
              <Slider minimumValue={1} 
                maximumValue={10}
                value={this.state.pugPages}
                step={1}
                onValueChange={(value) => this.setPugPages(value)}
                style={{flex: 1}}
              />
              <Icon name="paw" style={{paddingHorizontal: 8, fontSize: 24}}/>
              <Text style={{fontWeight: "bold"}}>
                {this.state.pugPages}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 8, flexDirection: "column"}}>
            <Button iconLeft success 
              style={{margin: 4, alignSelf: "center"}} 
              onPress={() => this.showMePuppers()}
            >
              <Icon active name="paw"/>
              <Text style={{color: "white"}}>Show me the puppers</Text>
            </Button>
            <Button iconLeft info style={{margin: 4, alignSelf: "center"}}>
              <Icon active name="alert"/>
              <Text style={{color: "white"}}>About this silly app</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
