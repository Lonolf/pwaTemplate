import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/analytics'

import firebaseConfig from 'config/firebase'

class Firebase {
  constructor() {
    if (firebaseConfig.projectId != null) {
      this.app = app.initializeApp(firebaseConfig)
      this.db = this.app.firestore()
      this.auth = this.app.auth()
      this.storage = this.app.storage()
      this.functions = this.app.functions('europe-west6')
      this.analytics = this.app.analytics()

      if (process.env.REACT_APP_ENV === 'local')
        this.db.useEmulator('localhost', 8080)

      this.eventChannels = {}
    } else {
      console.warn('ProjectId not configured')
    }
  }
  // User Sagas

  getUser = () => {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(user)
      })
    })
  };

  async processUser() {
    const user = await this.auth.currentUser
    // const idTokenResult = await this.auth.currentUser.getIdTokenResult(true)

    let loggedUser = {}

    loggedUser.userId = user.uid
    loggedUser.userEmail = user.email
    loggedUser.userName = user.displayName
    // loggedUser.brandId = (idTokenResult.claims || {}).brandId
    // loggedUser.role = (idTokenResult.claims || {}).role

    return loggedUser
  }

  async autoSignIn() {
    let user = await this.getUser()
    if (user) return await this.processUser()

    return false
  }

  async googleSignIn() {
    const provider = new app.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    await this.auth.signInWithRedirect(provider)
    let user = await this.getUser()
    if (user) return await this.processUser()
    else return null
  }

  async emailSignIn({ email, password }) {
    await this.auth.signInWithEmailAndPassword(email, password)
    let user = await this.getUser()
    if (user) return await this.processUser()
    else return null
  }

  async emailSignUp({ email, password, name = '' }) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    let user = await this.getUser()
    if (user) {
      await user.updateProfile({ displayName: name })
      return await this.processUser()
    } else {
      return null
    }
  }

  async signOut() {
    await this.auth.signOut()
    return true
  }

  async sendPasswordResetEmail({ email }) {
    await this.auth.sendPasswordResetEmail(email)
  }

  async logEvent({ name, data }) {
    await this.analytics.logEvent(name, data)
  }

  formatError = ({ err }) => {
    const error = new Error(err.message)
    error.name = err.name
    error.code = err.code
    return error
  };

  // Storage Sagas

  async getFileUrl({ bucketUrl }) {
    try {
      const reference = this.storage.refFromURL(bucketUrl)
      const url = await reference.getDownloadURL()
      return url
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  async uploadFile({ bucketUrl, file }) {
    try {
      const reference = this.storage.refFromURL(bucketUrl)
      const uploadTask = await reference.put(file)
      return uploadTask
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  async deleteFile({ bucketUrl }) {
    try {
      const reference = this.storage.refFromURL(bucketUrl)
      await reference.delete()
      return true
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  // DOCUMENTS

  async checkDocumentExistenceAsync({ collectionId, docId }) {
    let response = await this.db.collection(collectionId).doc(docId).get()
    if (!response.exists) return false
    else return true
  }

  async callFunction({ functionName, data }) {
    const called = this.functions.httpsCallable(functionName)
    const response = await called(data)
    return response.data
  }

  async checkDocumentExistence({ collectionId, docId }) {
    let response = await this.db.collection(collectionId).doc(docId).get()
    if (!response.exists) return false
    else return true
  }

  async getCollection({ collectionId = '' }) {
    let response = await this.db.collection(collectionId).get()
    return response.docs.reduce((list, doc) => {
      const data = doc.data()
      return { ...list, [doc.id]: data }
    }, {})
  }

  async getCollectionWithQuery({
    collectionId = '',
    key,
    operator = '==',
    value,
  }) {
    let response = await this.db
      .collection(collectionId)
      .where(key, operator, value)
      .get()
    return response.docs.reduce((list, doc) => {
      const data = doc.data()
      return { ...list, [doc.id]: data }
    }, {})
  }

  async getCollectionDoc({ collectionId = '', docId = '' }) {
    let response = await this.db.collection(collectionId).doc(docId).get()
    if (!response.exists)
      throw new Error(
        'Document ' + docId + ' not existing in collection ' + collectionId,
      )
    else return response.data()
  }

  async addCollectionDoc({ collectionId, data, idName = 'id' }) {
    const doc = await this.db.collection(collectionId).doc()
    data[idName] = doc.id
    await doc.set(data)
    return doc.id
  }

  async setCollectionDoc({ collectionId, docId, data }) {
    await this.db.collection(collectionId).doc(docId).set(data)
    return true
  }

  async updateCollectionDoc({ collectionId, docId, keyId, data }) {
    try {
      await this.db
        .collection(collectionId)
        .doc(docId)
        .update({
          [keyId]: data,
        })
      return true
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  async deleteCollectionDoc({ collection, doc }) {
    await this.db.collection(collection).doc(doc).delete()
    return true
  }

  async deleteCollectionDocField({ collectionId, docId, keyId }) {
    try {
      await this.db
        .collection(collectionId)
        .doc(docId)
        .update({
          [keyId]: app.firestore.FieldValue.delete(),
        })
      return { data: keyId }
    } catch (error) {
      return { error }
    }
  }

  async getSubCollection({ collectionId, docId, subCollectionId }) {
    try {
      let response = await this.db
        .collection(collectionId)
        .doc(docId)
        .collection(subCollectionId)
        .get()
      let data = []
      if (!response.empty && response.docs !== null)
        data = response.docs.map((doc) => doc.data())
      return data
    } catch (error) {
      return { error }
    }
  }

  async createSubCollectionDoc({
    collectionId,
    docId,
    subCollectionId,
    idName = 'id',
    data,
  }) {
    const doc = await this.db
      .collection(collectionId)
      .doc(docId)
      .collection(subCollectionId)
      .doc()
    data[idName] = doc.id
    await doc.set(data)
    return true
  }

  async setSubCollectionDoc({
    collectionId,
    docId,
    subCollectionId,
    subDocId,
    data,
  }) {
    await this.db
      .collection(collectionId)
      .doc(docId)
      .collection(subCollectionId)
      .doc(subDocId)
      .set(data)
    return true
  }

  async setWatchDocument({ docId, collectionId, setChanges } = {}) {
    this.eventChannels[collectionId + docId] = this.db.collection(collectionId).doc(docId)
      .onSnapshot(doc => {
        setChanges({ data: doc.data(), id: doc.id })
      })
  }

  dateToFirebaseTimestamp = (date) => {
    return app.firestore.Timestamp.fromDate(new Date(date))
  }

  currentDate = () => {
    return app.firestore.Timestamp.now()
  }
}

export default new Firebase()
