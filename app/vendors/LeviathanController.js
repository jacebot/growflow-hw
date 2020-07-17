"use strict";
require("es6-promise").polyfill();
const fetch = require("isomorphic-fetch");
const async = require("async");
const apiString = "https://leviathan.challenge.growflow.com/";

const defaultOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

class LeviathanController {
  async queue(apiCall, fetchOptions = defaultOptions) {
    try {
      const callDaBeast = (uri, callback) => {
        try {
          let result = null;
          let errorState = null;

          // this is terribly written and incomplete, but....
          // We are trying to keep this flexible so that we just send the
          // appended URI and any option overrides
          // Then return either the data or an error back to the original callee
          fetch(uri, fetchOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              result = data;
            })
            .catch((error) => {
              console.error(error);
              errorState = error;
            });

          callback(null, result || errorState);
        } catch (err) {
          callback(err);
        }
      };

      // Arbitrary numbers being used here as a base threshold...
      async.retry(
        { times: 5, interval: 200 },
        function (callback) {
          return callDaBeast(apiString + apiCall, callback);
        },
        function (err, result) {
          if (err) {
            /*
            | Here we should log the incident and then push the call into
            | a queue that may be stored in an offline table like sqlLite or mongoDB
            | and then we can try again from a separate scheduler and reconcile function
            */

            throw err; // Error still thrown after retrying N times, so rethrow.
          }
        }
      );
    } catch (error) {
      /*
      | Here we should log the incident and then push the call into
      | a queue that may be stored in an offline table like sqlLite or mongoDB
      | and then we can try again from a separate scheduler and reconcile function
      */
      throw error;
    }
  }
}

module.exports = LeviathanController;
