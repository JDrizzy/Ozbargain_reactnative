import React, {Component} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

import Item from '../database/item';
import OzBargainFetch from '../services/ozbargainFetch';

export default class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: () => (
      <Text style={styles.headerLeftText}>
        {navigation.getParam('itemCount', '')}
      </Text>
    ),
    headerStyle: {
      backgroundColor: '#f4511e'
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: []
    };
  }

  componentDidMount() {
    this._refreshList();
  }

  _refreshList = () => {
    const {navigation} = this.props;
    Item.all().then(items => {
      if (items !== null) {
        navigation.setParams({itemCount: items.length});
        this.setState({data: items});
      } else {
        this._sync();
      }
    });
  };

  _sync = () => {
    this.setState({loading: true});
    OzBargainFetch.execute()
      .then(rss => {
        rss.items.map(item => {
          Item.create({
            id: parseInt(item.id, 10),
            title: item.title,
            description: item.description
          });
        });
        this._refreshList();
        this.setState({loading: false});
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          onRefresh={this._sync}
          refreshing={this.state.loading}
          data={this.state.data}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              onPress={() =>
                this.props.navigation.navigate('Detail', {id: item.id})
              }
              chevron
              bottomDivider
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 20
  },

  container: {
    flex: 1,
    marginTop: 10
  }
});
