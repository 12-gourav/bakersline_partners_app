import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import OrderStyle from "@/styles/order";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

const SearchBarWithFilter = ({
  setQuery,
  query,
  setIsvisible,
  handleSearch
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setIsvisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch:any
}) => {
  return (
    <View style={OrderStyle.search_wrapper}>
      <View style={OrderStyle.searchbar}>
        <TextInput
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholder="Search by product or address"
          style={OrderStyle.barInput}
        />
        <TouchableOpacity style={OrderStyle.searchbtn} onPress={()=>handleSearch()}>
          <Feather name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setIsvisible(true)}
        style={OrderStyle.filterbtn}
      >
        <Octicons name="filter" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarWithFilter;
