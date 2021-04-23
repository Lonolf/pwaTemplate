import uniqid from 'uniqid'
import firebase from 'utility/firebase'

export const basicModel = ({
  nodeId,
  creationDate,
  title = '',
  text = '',
  tags = [],
  userId = '',
} = {}) => ({
  nodeId: String(nodeId ?? uniqid()),
  creationDate: creationDate ?? firebase.currentDate(),
  editDate: firebase.currentDate(),
  title: String(title),
  text: String(text),
  tags: tags?.map?.(tag => String(tag).trim())?.filter(tag => tag) ?? [],
  userId: String(userId),
})
