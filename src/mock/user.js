import Mock from 'mockjs'

function randomUserData() {
  let user = []
  for (let i = 0; i < 7; i++) {
    let item = {
      key: Mock.mock('@id'),
      id: Mock.mock('@id'),
      username: Mock.mock('@cname'),
      lastLoginTime: Mock.mock('@time("HH:mm")'),
      status: Mock.mock('@pick([0, 1])'),
      like: Mock.mock('@integer(15, 100)')
    }
    user.push(item)
  }
  return user
}

export const UserData = randomUserData