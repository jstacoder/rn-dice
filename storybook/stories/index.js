import React from 'react';
import { Text } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Grid', module)
  .add('two rows', ()=>{
    return (
      <Grid>
        <Row size={5} style={{backgroundColor: 'grey'}}><Text>Row 1</Text></Row>
        <Row size={5} style={{backgroundColor: 'yellow'}}><Text>Row 2</Text></Row>        
      </Grid>
    )
  })
  .add('two cols', ()=>{
    return (
      <Grid>
        <Col size={1} style={{backgroundColor: 'grey'}}><Text>Row 1</Text></Col>
        <Col size={5} style={{backgroundColor: 'blue'}}><Text>Row 1</Text></Col>        
        <Col size={1} style={{backgroundColor: 'yellow'}}><Text>Row 2</Text></Col>        
      </Grid>
    )
  })


storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button full onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('full button', ()=>(
    <Button light full>
      <Text>full</Text>
    </Button>
  ))
  .add('block', ()=>(

    <Grid>
    <Col size={1} style={{backgroundColor: 'white'}}><Text>Row 1</Text></Col>
    <Col size={5} style={{backgroundColor: 'white'}}>
      
      <Button warning block>
        <Text>block</Text>
      </Button>      
        <Button block danger bordered>
          <Text style={{color: 'black'}}>Bordered</Text>
        </Button>
        
      <Button warning bordered full>
        <Text style={{color: 'black'}}>Warning</Text>
      </Button>
      <Button success bordered full>
        <Text style={{color: 'black'}}>success</Text>
      </Button>
      <Button info bordered full>
        <Text style={{color: 'black'}}>info</Text>
      </Button>      
      <Button light rounded large block>
        <Text>rounded</Text>
      </Button>
    </Col>        
    <Col size={1} style={{backgroundColor: 'white'}}><Text>Row 2</Text></Col>        
  </Grid>
    
  ))
  .add('with some emoji', () => (
    <Button light onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));
