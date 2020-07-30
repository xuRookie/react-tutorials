import Mock from 'mockjs'

function randomTaskData() {
  let user = []
  for (let i = 0; i < 7; i++) {
    let item = {
      key: Mock.mock('@id'),
      id: Mock.mock('@id'),
      taskName: Mock.mock('@cword(3, 5)'),
      taskTime: Mock.mock('@pick(["半小时", "一小时", "两小时", "三小时", "四小时", "五小时", "六小时"])'),
      taskStatus: Mock.mock('@pick(["已完成", "进行中", "未开始"])')
    }
    user.push(item)
  }
  return user
}

export const TaskData = randomTaskData