import React from 'react';
import { Text } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'


import { SectionList } from 'react-native'
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

import { ListItem } from 'react-native-elements'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
let sec
storiesOf('Grid', module)
  .add('two rows', ()=>{
    const dataSource = [ 
      { title: 'Title1', data: [{name:'item1'}, {name:'item2'}] }, 
      { title: 'Title2', data: [{name:'item3'}, {name:'item4'}] }, 
      { title: 'Title3', data: [{name:'item5'}, {name:'item6'}] }, 
    ]
    const sectionIndexs = dataSource.map( (itm, idx)=> (itm.title))
    const loadSectionIndex = section => sectionIndexs.indexOf(section.title)
    const renderItem = ({item, index, section}) => (<ListItem onPress={()=>{sec && sec.scrollToLocation({itemIndex: index, sectionIndex: loadSectionIndex(section)})}} title={JSON.stringify(section)} containerStyle={{backgroundColor: 'orange'}}/>)
    const renderSectionHeader = ({section: { title }}) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>

    return (
      <Grid>
        <Row size={5} style={{backgroundColor: 'grey'}}>
        <SectionList 
          getItemLayout={(data, index)=>({
            length: 25,
            offset: 25*index,
            index,
          })}
          ref={ref=> sec = ref}
          renderItem={renderItem} 
          renderSectionHeader={renderSectionHeader} 
          sections={dataSource} 
          keyExtractor={(item, index) => item + index} />
        </Row>
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
