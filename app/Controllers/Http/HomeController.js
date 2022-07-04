'use strict'

const User = use('App/Models/User')
const Holiday = use('App/Models/Holiday')

class HomeController {
  async index ({ response }) {
    //get all employee
    const all_employee = await User.query().count()
    const all_employee_total = all_employee[0]['count(*)']

    //get tag employee
    const tag_employee = await User.query().where('tag', 'พนักงาน').count()
    const tag_employee_total = tag_employee[0]['count(*)']

    //get tag internship
    const tag_internship = await User.query().where('tag', 'ฝึกงาน').count()
    const tag_internship_total = tag_internship[0]['count(*)']

    //get tag employee
    const tag_probation = await User.query().where('tag', 'ทดลองงาน').count()
    const tag_probation_total = tag_probation[0]['count(*)']

    //get employee gender
    const gender_male = await User.query().where('gender', 'Male').count()
    const gender_male_total = gender_male[0]['count(*)']
    const gender_female = await User.query().where('gender', 'Female').count()
    const gender_female_total = gender_female[0]['count(*)']

    //get current month
    const today = new Date();
    const current_month = today.getMonth()+1;

    const holidays = await Holiday.query().where('from', 'LIKE', `%${current_month}%`)
      .orderBy('created_at', 'desc')
      .fetch()

    response.status(200).json({
      message: 'All Data Home.',
      holidays, all_employee_total, tag_employee_total, tag_internship_total, tag_probation_total, gender_male_total, gender_female_total
    })
  }
}

module.exports = HomeController
