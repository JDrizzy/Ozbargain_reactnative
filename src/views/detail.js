import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Item from '../database/item';

export default class Detail extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f4511e'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      item: {
        id: 0,
        title: '',
        description: ''
      }
    };
  }

  componentDidMount() {
    this._fetchItem();
  }

  _fetchItem() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('id', 0);
    Item.find(itemId).then(item => {
      if (item !== null) {
        this.setState({
          item: {
            id: item.id,
            title: item.title,
            description: item.description
          }
        });
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{this.state.item.title}</Text>
        <WebView source={{html: this.state.item.description}} textZoom={300} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
