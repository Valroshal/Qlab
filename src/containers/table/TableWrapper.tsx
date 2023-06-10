import { View, Text, Button, StyleSheet, ScrollView, ViewStyle } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { fetchUsersData } from "./utils";
import { UserType } from "../../consts/types";
import TableRow from "./components/TableRow";

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  } as ViewStyle,
})

const pages = [10, 20, 50] //TODO
const TableWrapper = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState<UserType[]>([])

  const startIndex = useMemo(() => {
    console.log('startIndex', (currentPage - 1) * usersPerPage);
    return (currentPage - 1) * usersPerPage
  }, [usersPerPage, currentPage])

  const endIndex = useMemo(() => {return startIndex + usersPerPage }, [startIndex, usersPerPage]);

  useEffect(() => {
    console.log('users', users)
    const fetchUsers = async () => {
      try {
        const userData = await fetchUsersData();
        setUsers(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers().catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    console.log('in displayed users');
    setDisplayedUsers(users.slice(startIndex, endIndex))
  },[startIndex, users, endIndex ])

  useEffect(() => {
    for(let i=0; i<displayedUsers.length; i++){
      console.log('displayedUsers[i]',i, '  ', displayedUsers[i].lastName)
    }
  }, [displayedUsers])


  const handleUsersPerPageChange = (value: any) => { //TODO
    setUsersPerPage(value);
    setCurrentPage(1); // Reset to the first page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log('currentPage', currentPage);
    }
  };

  const handleUpdateUser = (updatedUser: UserType) => {
    setUsers(users.map(user => user.uuid === updatedUser.uuid ? updatedUser : user));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.uuid !== userId));
  };

  return(
    <View style={{paddingBottom: 20}}>
      <Text>Users per page: {usersPerPage}</Text>
      <SelectDropdown
        data={pages}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          handleUsersPerPageChange(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
        defaultValue={usersPerPage}
      />
      <ScrollView style={{marginBottom: 50}}>
        {displayedUsers.map((user:UserType, index) => (
          <TableRow
            key={user.uuid}
            user={user}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Previous" onPress={handlePreviousPage} />
          <Button title="Next" onPress={handleNextPage} />
        </View>
      </ScrollView>

    </View>
  )
}

export default TableWrapper;
