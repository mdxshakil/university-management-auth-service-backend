import { User } from './users.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = await findLastUserId()
  const nextId = currentId
    ? String(parseInt(currentId, 10) + 1).padStart(5, '0')
    : '00001'
  return nextId
}
