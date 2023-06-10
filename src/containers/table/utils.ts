import { UserType } from "../../consts/types";

export const fetchUsersData = async (): Promise<UserType[]> => {
  let userData: UserType[] = [];

  for (let i = 0; i < 3; i++) {
    const response = await fetch('https://randomuser.me/api/?results=15');
    const data = await response.json();

    const usersData = data.results.map((result: any) => {
      return {
        firstName: `${result.name.first}`,
        lastName: `${result.name.last}`,
        gender: result.gender,
        email: result.email,
        phone: result.phone,
        uuid: result.login.uuid,
        location: result.location,
        picture: `${result.picture.thumbnail}`
      } as UserType;
    });

    userData = userData.concat(usersData);
  }

  return userData;
};
