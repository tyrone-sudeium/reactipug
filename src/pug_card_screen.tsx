import * as React from "react"
import {
  NavigationScreenProps
} from "react-navigation"

import {
  Container,
  Content,
  Card,
  CardItem,
  Left, Body, Right,
  Button,
  Text
} from "native-base"

import Icon from "react-native-vector-icons/FontAwesome"

import {
  Image
} from "react-native"

import { PugPost } from "./api"

export interface PugCardScreenProps {
  pug?: PugPost
  pugId: string
}

const moment = require("moment")

type Props = PugCardScreenProps & NavigationScreenProps<PugCardScreenProps>

export const PugCardScreen: React.SFC<Props> = (props) =>
  <Container>
    <Content padder style={{backgroundColor: "white"}}>
      <Card>
        <CardItem style={{paddingLeft: 8, paddingRight: 8}}>
          <Body>
            <Text>
              {props.pug.title}
            </Text>
            <Text note style={{fontSize: 12}}>
              {`Submitted by ${props.pug.author}`}
            </Text>
          </Body>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: props.pug.url}} style={{height: 200, flex: 1}}/>
        </CardItem>
        <CardItem style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 8, paddingRight: 8}}>
          <Left>
            <Button transparent>
              <Icon name="arrow-circle-o-up" style={{padding: 4, color: "#2874F0", fontSize: 24}}/>
              <Text>Score: {props.pug.score}</Text>
            </Button>
          </Left>
          <Right>
            <Text>{moment(props.pug.date).fromNow()}</Text>
          </Right>
        </CardItem>
      </Card>
    </Content>
  </Container>
