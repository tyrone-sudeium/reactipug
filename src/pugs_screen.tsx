import * as React from "react"
import {
  NavigationScreenProps,
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction
} from "react-navigation"

import {
  Container,
  Content,
  List,
  ListItem,
  Spinner,
  Thumbnail,
  Left, Body, Right,
  Text
} from "native-base"

import {
  getPugs,
  PugPost
} from "./api"

const moment = require("moment")

export interface PugsScreenProps {
  pages: number
}

type Props = PugsScreenProps & NavigationScreenProps<PugsScreenProps>

interface PugsScreenState {
  pugs?: PugPost[]
}

export class PugsScreen extends React.Component<Props, PugsScreenState> {
  static navigationOptions = (props: PugsScreenProps) => {
    const noun = props.pages == 1 ? "page" : "pages"
    return {
      title: `${props.pages} ${noun} of pugs!`
    }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      pugs: null
    }
  }

  componentDidMount() {
    getPugs(this.props.pages).then((pugs) => {
      this.setState({pugs})
    }).catch(console.error)
  }

  tapPug(pug: PugPost) {
    this.props.navigation.navigate("pugCard", {
      pug: pug,
      pugId: pug.id
    })
  }

  render(): JSX.Element {
    return (
      <Container>
        <Content>
          {this.state.pugs ? this.renderList() : this.renderSpinner()}
        </Content>
      </Container>
    )
  }

  renderSpinner(): JSX.Element {
    return <Spinner/>
  }

  renderList(): JSX.Element {
    return (
      <List dataArray={this.state.pugs} renderRow={(data: PugPost) =>
        <ListItem onPress={() => this.tapPug(data)}>
          <Thumbnail square size={80} source={{uri: data.url}}/>
          <Body>
            <Text>{data.title}</Text>
            <Text note>
              {`Submitted by ${data.author} ${moment(data.date).fromNow()}`}
            </Text>
          </Body>
          <Right>
            <Text note style={{fontSize: 12}}>Score</Text>
            <Text note style={{fontSize: 12}}>{data.score}</Text>
          </Right>
        </ListItem>
        }
      />
    )
  }
}
