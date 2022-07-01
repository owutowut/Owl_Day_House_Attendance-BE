'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  leaves () {
    return this.hasMany('App/Models/Leave')
  }

  work_from_homes () {
    return this.hasMany('App/Models/WorkFromHome')
  }

  notifications () {
    return this.hasMany('App/Models/Notification')
  }
}

module.exports = User
