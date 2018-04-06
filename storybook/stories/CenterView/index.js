import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid'
import style from './style';

export default function CenterView(props) {
  return (
    <Grid>
      <Row>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Grid>
  )
}

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};
