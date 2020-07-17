'use strict'

const LeviathanController = require("../../vendors/LeviathanController");
const Fishy = new LeviathanController;

/*
| These credentials would normally come from the Front end user
|
| API User: CHALLENGEUSER
| API Key: CHALLENGEKEY
*/

class EmployeeController {

  async create({ request, auth,  response }) {
    const {apiUser , apiKey, employeeData} = request.only(['apiUser, apiKey, employeeData'])

    try {
      const uriString = `employee/`

      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify({
          ApiKey: apiKey,
          ApiUser: apiUser,
          ...employeeData
        })
      };

      const employee = await Fishy.queue(uriString, fetchOptions)

      return response.json({
        status: 'success',
        employee_id: employee.id
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the new employee, please try again in a few seconds.'
      })
    }
  }

  async list({ auth, response, request }) {
    const {apiUser , apiKey} = request.only(['apiUser, apiKey'])

    // const uriString = `employee/get-all/?ApiUser=${apiUser}&ApiKey=${apiKey}`
    // Test with hard coded creds...
    const uriString = `employee/get-all/?ApiUser=CHALLENGEUSER&ApiKey=CHALLENGEKEY`

    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    const employeeList = await Fishy.queue(uriString, fetchOptions)

    try {
      return response.json({
        status: "success",
        employees: employeeList,
      });
    } catch (error) {
      response.status(400).json({
        status: "error",
        message:
          "There was a problem getting the list of employee's, please try again in a few seconds.",
      });
    }
  }
}

module.exports = EmployeeController
