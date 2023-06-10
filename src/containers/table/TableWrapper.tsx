import { View, Text, Button, StyleSheet, ScrollView, ViewStyle, Image } from "react-native"
import React, { useEffect, useMemo, useState } from "react"
import SelectDropdown from 'react-native-select-dropdown'
import { fetchUsersData } from "./utils"
import { TypeUser } from "../../consts/types"
import TableRow from "./components/TableRow"
import ArrowUp from '../../assets/images/arrow-up.png'
import ArrowDown from '../../assets/images/arrow-down.png'
import { pages } from "../../consts/consts"

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10
  } as ViewStyle,
})

const TableWrapper = () => {
  const [users, setUsers] = useState<TypeUser[]>([])
  const [usersPerPage, setUsersPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [displayedUsers, setDisplayedUsers] = useState<TypeUser[]>([])

  const startIndex = useMemo(() => {
    return (currentPage - 1) * usersPerPage
  }, [usersPerPage, currentPage])

  const endIndex = useMemo(() => {return startIndex + usersPerPage }, [startIndex, usersPerPage])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await fetchUsersData()
        setUsers(userData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers().catch(error => {
      console.error(error)
    })
  }, [])

  useEffect(() => {
    setDisplayedUsers(users.slice(startIndex, endIndex))
  },[startIndex, users, endIndex ])

  const handleUsersPerPageChange = (value: number) => {
    setUsersPerPage(value)
    setCurrentPage(1) // Reset to the first page
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(users.length / usersPerPage)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleUpdateUser = (updatedUser: TypeUser) => {
    setUsers(users.map(user => user.uuid === updatedUser.uuid ? updatedUser : user))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.uuid !== userId))
  }

  return(
    <View style={{paddingVertical: 20, display: 'flex', alignItems: 'center'}}>
      <Text style={{fontSize: 16}}>Users per page: {usersPerPage}</Text>
        <SelectDropdown
          buttonStyle={{borderWidth: 1, borderColor: '#000'}}
          data={pages}
          onSelect={(selectedItem, index) => {
            handleUsersPerPageChange(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          defaultValue={usersPerPage}
          renderDropdownIcon={(isOpened) => (
            <Image source={isOpened? ArrowUp: ArrowDown} />
          )}
        />
      <ScrollView style={{marginBottom: 80}}>
        {displayedUsers.map((user:TypeUser, index) => (
          <TableRow
            key={user.uuid}
            user={user}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        ))}
        <View style={styles.buttonContainer}>
          <View style={{width: 90}}>
            <Button title="Previous" onPress={handlePreviousPage} />
          </View>
          <View style={{width: 90}}>
            <Button title="Next" onPress={handleNextPage} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default TableWrapper
