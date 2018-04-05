import React from 'react'
import { Container, Content, Header, Text, Button, Picker, Form } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'

export default class PlayerPicker extends React.Component {

  render(){
    return (
      <Container>
        <Header></Header>
        <Content>
          <Grid>
            <Row>
              <Text>Pick Players</Text>
              <Form>
                  <Picker
                    iosHeader="Select Number Of Players"
                    placeholder="pick players"
                    mode="dropdown"
                    selectedValue={0}
                    onValueChange={value=> this.props.setPlayers(value)}
                  >
                    <Picker.Item label="1" value={1}/>
                    <Picker.Item label="2" value={2}/>
                    <Picker.Item label="3" value={3}/>
                    <Picker.Item label="4" value={4}/>
                    <Picker.Item label="5" value={5}/>
                  </Picker>
              </Form>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}