import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import Cel from './components/Cel';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      turn: 'blue',
      cel1: 'white',
      cel2: 'white',
      cel3: 'white',
      cel4: 'white',
      cel5: 'white',
      cel6: 'white',
      cel7: 'white',
      cel8: 'white',
      cel9: 'white',
      button: 'PLAY',
      match: 1,
    }
  }

  componentDidMount(){
    this.recupera()
  }

  async recupera(){
    const match = await AsyncStorage.getItem('match');
    console.log('match', match)
    if (match == null){
      await AsyncStorage.setItem('match', '1');
    } else {
      this.setState({ match: match })
    }
  }
   
  async setMatch(value){
    this.setState({ match: value });
    await AsyncStorage.setItem('match', value.toString());
  }

  async play(play, cel){
    if(cel === 'white'){
      this.changeButton()
      await this.setState(play)
      this.gameOver();
    } else {
      Alert.alert(
        'Ops...',
        'This cell has already been played',
        [
          {text: 'OK', onPress: () => false},
        ],
        {cancelable: false},
      );
    }
  }

  changeTurn(){
    if(this.state.turn === 'blue'){
      this.setState({ turn : 'red'});
    } else {
      this.setState({ turn : 'blue'});
    }
  }

  changeButton(){
    if(this.state.button === 'PLAY'){
      this.setState({ button : 'RESET'});
    } 
  }

  celEquals(a, b, c){
    if( (a === b) && (b === c) && (a !== "white")){
        return true;
    }
    else{
        return false;
    }
  }

  gameOver(){
    const { cel1, cel2, cel3, cel4, cel5, cel6, cel7, cel8, cel9 } = this.state;

    if( this.celEquals(cel1, cel2, cel3) || this.celEquals(cel4, cel5, cel6) ||
    this.celEquals(cel7, cel8, cel9) || this.celEquals(cel1, cel4, cel7) || 
    this.celEquals(cel2, cel5, cel8) || this.celEquals(cel3, cel6, cel9) ||
    this.celEquals(cel1, cel5, cel9) || this.celEquals(cel3, cel5, cel7)){
      Alert.alert(
        'TicTacToe',
        `Winner is ${this.state.turn}!`,
        [
          {text: 'OK', onPress: () => {this.resetMatch()}},
        ],
        {cancelable: false},
      );
      this.setMatch(parseInt(this.state.match)+1)
    } else if ( cel1 != 'white' && cel2 != 'white' && cel3 != 'white' &&
    cel4 != 'white' && cel5 != 'white' && cel6 != 'white' &&
    cel7 != 'white' && cel8 != 'white' && cel9 != 'white'){
      Alert.alert(
        'TicTacToe',
        'Tie!',
        [
          {text: 'OK', onPress: () => this.resetMatch()},
        ],
        {cancelable: false},
      );
      this.setMatch(parseInt(this.state.match)+1)
    } else {
      this.changeTurn();
    }
  }

  async reset(){
    this.setState({
      turn: 'blue',
      cel1: 'white',
      cel2: 'white',
      cel3: 'white',
      cel4: 'white',
      cel5: 'white',
      cel6: 'white',
      cel7: 'white',
      cel8: 'white',
      cel9: 'white',
      button: 'PLAY',
      match: 1
    });
    await AsyncStorage.setItem('match', '1');
  }

  resetMatch(){
    this.setState({
      cel1: 'white',
      cel2: 'white',
      cel3: 'white',
      cel4: 'white',
      cel5: 'white',
      cel6: 'white',
      cel7: 'white',
      cel8: 'white',
      cel9: 'white',
    });
    this.changeTurn();
  }




  render() {
    return (
      <View style={styles.container}>
        <View style={styles.game}>
          <View style={styles.row}>
            <Cel 
            onPress={() => this.play({cel1: this.state.turn}, this.state.cel1 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel1, display : (this.state.cel1 != 'white') ? 'flex': 'none'}]}
            />
            <Cel 
            onPress={() => this.play({cel2: this.state.turn}, this.state.cel2 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel2, display : (this.state.cel2 != 'white') ? 'flex': 'none'}]}
            />
            <Cel 
            onPress={() => this.play({cel3: this.state.turn}, this.state.cel3 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel3, display : (this.state.cel3 != 'white') ? 'flex': 'none'}]}
            />
          </View>
          <View style={styles.row}>
            <Cel 
            onPress={() => this.play({cel4: this.state.turn}, this.state.cel4 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel4, display : (this.state.cel4 != 'white') ? 'flex': 'none'}]}
            />
            <Cel 
            onPress={() => this.play({cel5: this.state.turn}, this.state.cel5 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel5, display : (this.state.cel5 != 'white') ? 'flex': 'none'}]}
            />
            <Cel 
            onPress={() => this.play({cel6: this.state.turn}, this.state.cel6 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel6, display : (this.state.cel6 != 'white') ? 'flex': 'none'}]}
            />
          </View>
          <View style={styles.row}>
            <Cel 
            onPress={() => this.play({cel7: this.state.turn}, this.state.cel7 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel7, display : (this.state.cel7 != 'white') ? 'flex': 'none'}]}
            />
            <Cel 
            onPress={() => this.play({cel8: this.state.turn}, this.state.cel8 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel8, display : (this.state.cel8 != 'white') ? 'flex': 'none'}]}
            />
            <Cel 
            onPress={() => this.play({cel9: this.state.turn}, this.state.cel9 )}
            styleCel={styles.cel}
            styleIcon={[styles.icon, { tintColor: this.state.cel9, display : (this.state.cel9 != 'white') ? 'flex': 'none'}]}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text style={{fontWeight: 'bold'}}>TURN</Text>
            <Image source={require('./img/peso.png')} style={{tintColor: this.state.turn, width: 50, height: 50}}/>
          </View>
          <View style={styles.footerItem}>
            <Text style={{fontWeight: 'bold'}}>MATCH</Text>
            <Text style={{fontWeight: 'bold'}}>{this.state.match}</Text>
          </View>
          <View style={styles.footerItem}>
            <TouchableOpacity
                  onPress={() => Alert.alert(
                    'Match',
                    'Reset game?',
                    [
                      {text: 'OK', onPress: () => this.reset()},
                      {text: 'Cancel', onPress: () => false},
                    ],
                    {cancelable: false},
                  )}
              >
              <View style={styles.button}>
                <Text style={{fontWeight: 'bold'}}>{this.state.button}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center'
  },
  game: {
    flex: 6,
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
  },
  row: {
    flex: 1,
  },
  cel: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100
  },
  button: {
    height: 45,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90
  }
});
