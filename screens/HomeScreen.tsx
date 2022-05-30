import { StyleSheet } from 'react-native';
import React from 'react';
import {useState, useReducer, createContext, useContext, useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Divider, List, ListItem, Input, Icon} from '@ui-kitten/components';
import {SearchContext} from '../store/SearchStore'
export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

    const {state,dispatch} = useContext(SearchContext)
    const {isFetching} = state
    useEffect(()=>{
        dispatch({type:'FETCHING_ITEMS'})
        new Promise((resolve)=>{
            setTimeout(resolve,500)
        }).then(()=>{
            dispatch({type:'FETCHING_SUCCESS',payload:mockData2})
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
        title: 'one',
        description: 'lorenipsum'
    },
    {
        title: 'two',
        description: 'lorenipsum'
    },
    {
        title: 'three',
        description: 'lorenipsum'
    },
    {
        title: 'four',
        description: 'lorenipsum'
    },
    {
        title: 'one',
        description: 'lorenipsum'
    },
    {
        title: 'two',
        description: 'lorenipsum'
    },
    {
        title: 'three',
        description: 'lorenipsum'
    },
    {
        title: 'four',
        description: 'lorenipsum'
    },
    {
        title: 'one',
        description: 'lorenipsum'
    },
    {
        title: 'two',
        description: 'lorenipsum'
    },
    {
        title: 'three',
        description: 'lorenipsum'
    },
    {
        title: 'four',
        description: 'lorenipsum'
    },
    {
        title: 'one',
        description: 'lorenipsum'
    },
    {
        title: 'two',
        description: 'lorenipsum'
    },
    {
        title: 'three',
        description: 'lorenipsum'
    },
    {
        title: 'four',
        description: 'lorenipsum'
    },
    {
        title: 'one',
        description: 'lorenipsum'
    },
    {
        title: 'two',
        description: 'lorenipsum'
    },
    {
        title: 'three',
        description: 'lorenipsum'
    },
    {
        title: 'four',
        description: 'lorenipsum'
    },
]
const mockData = new Array(8).fill({
    title: 'Item',
    description: 'Description for Item',
  });
const ListDividersShowcase = ({navigation}: RootStackScreenProps<'Home'>) => {

    const {state,dispatch} = useContext(SearchContext)
    const {filteredItems} = state
    const renderItemIcon = (props: any) => (
        <Icon {...props} name='person'/>
      );
    const renderItemRight = (props: any) =>(
        <Icon {...props} name='arrow-ios-forward-outline'/>
    )
    const renderItem = ({ item , index } : {item :{title : string, description : string }; index : number}) => (
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
        onPress={()=>navigation.push('PersonalInfo',{title: item.title})}
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
    const {state,dispatch} = useContext(SearchContext)
    useEffect(()=>{
        if(value === ''){
            dispatch({type:'SHOW_ALL_ITEMS'})
        }else{
            dispatch({type:'SHOW_FILTERED_ITEMS',payload:value})
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
