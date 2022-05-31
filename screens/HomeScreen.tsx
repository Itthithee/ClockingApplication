import { StyleSheet } from 'react-native';
import React from 'react';
import {useState, useReducer, createContext, useContext, useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Divider, List, ListItem, Input, Icon} from '@ui-kitten/components';
import {SearchContext} from '../store/SearchStore'
import { ClockingContext } from '../store/ClockingStore';
export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

    const {searchState,searchDispatch} = useContext(SearchContext)
    const {isFetching} = searchState
    useEffect(()=>{
        searchDispatch({type:'FETCHING_ITEMS'})
        new Promise((resolve)=>{
            setTimeout(resolve,500)
        }).then(()=>{
            searchDispatch({type:'FETCHING_SUCCESS',payload:mockData2})
            return
        })
    },[])
    if(isFetching){
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
        <View style={styles.searchBox}>
            <SearchBox/>
        </View>
        <View style={styles.listContainer}>
            <ListDividersShowcase {...{navigation}}/>
        </View>
        
        {/* <Text style={styles.title}>This is home screen.</Text>
        <TouchableOpacity onPress={() => navigation.push('NotFound')} style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
        </TouchableOpacity> */}

        </View>
    );
}
const mockData2 = [
    {
        userId: 1,
        name: 'one',
        description: 'lorenipsum'
    },
    {
        userId: 2,
        name: 'two',
        description: 'lorenipsum'
    },
    {
        userId: 3,
        name: 'three',
        description: 'lorenipsum'
    },
    {
        userId: 4,
        name: 'four',
        description: 'lorenipsum'
    },
    {
        userId: 5,
        name: 'five',
        description: 'lorenipsum'
    },
]

const ListDividersShowcase = ({navigation}: RootStackScreenProps<'Home'>) => {

    const {searchState} = useContext(SearchContext)
    const {filteredItems} = searchState
    const {clockingDispatch} = useContext(ClockingContext);
    const renderItemIcon = (props: any) => (
        <Icon {...props} name='person'/>
      );
    const renderItemRight = (props: any) =>(
        <Icon {...props} name='arrow-ios-forward-outline'/>
    )
    const renderItem = ({ item , index } : {item :{name : string, description : string }; index : number}) => (
      <ListItem
        title={`${item.name}`}
        description={`${item.description}`}
        onPress={()=>{
            navigation.push('PersonalInfo')
            clockingDispatch({type: 'SELECT_USER', payload: item,})
        }}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemRight}
      />
    );
    return (
      <List
        data={filteredItems}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    );
  };

const SearchBox = () => {
    const [value, setValue] = useState('');
    const {searchDispatch} = useContext(SearchContext)
    useEffect(()=>{
        if(value === ''){
            searchDispatch({type:'SHOW_ALL_ITEMS'})
        }else{
            searchDispatch({type:'SHOW_FILTERED_ITEMS',payload:value})
        }
        
    },[value])
    return (
    <Input
      placeholder='Place your Text'
      value={value}
      onChangeText={nextValue => setValue(nextValue)}
    />
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "flex-start",
    maxHeight: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  searchBox: {
  },
  listContainer: {
      marginTop: 10,
  },

});
