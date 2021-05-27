const axios = require("axios");
const qs = require("qs");

class AxiosEasyfier {
  constructor() {
    this.request = {};
    this.urlEncodedParams = {};
  }

  static POST_METHOD = "POST";
  static PUT_METHOD = "PUT";
  static PATCH_METHOD = "PATCH";
  static GET_METHOD = "GET";
  static DELETE_METHOD = "DELETE";
  static BEARER_AUTHENTICATION = "Bearer";
  static BASIC_AUTHENTICATION = "Basic";

  /**
   * Configure http headers for request
   * @param {Array} arrayOfKeyValuePairs
   * @returns AxiosEasyfier instance
   */
  withHeaders(arrayOfKeyValuePairs) {
    if (!arrayOfKeyValuePairs)
      throw new Error(
        'Header parameters (array of {"key": "value"} or instance of then) is required.'
      );

    if (this.request.headers === undefined) this.request.headers = {};
    setArrayOfParams(this.request.headers, arrayOfKeyValuePairs);

    return this;
  }

  /**
   * Configure encoded params
   * @param {Array} arrayOfKeyValuePairs
   * @returns AxiosEasyfier instance
   */
  withUrlEncondedParams(arrayOfKeyValuePairs) {
    if (!arrayOfKeyValuePairs)
      throw new Error(
        'Url encoded parameters (array of {"key": "value"} or instance of then) is required.'
      );

    if (!this.urlEncodedParams) this.urlEncodedParams = {};
    setArrayOfParams(this.urlEncodedParams, arrayOfKeyValuePairs);

    return this;
  }

  /**
   * Set Authorization: Basic {secret} on header
   * @param {string} secret
   */
  withBasicAuthorization(secret) {
    if (!secret || secret === "") throw new Error("Secret is required.");

    setAuthorization(this.request, AxiosEasyfier.BASIC_AUTHENTICATION, secret);
    return this;
  }

  /**
   * Set Authorization: Bearer {secret} on header
   * @param {string} secret
   */
  withBearerAuthorization(secret) {
    if (!secret || secret === "") throw new Error("Secret is required.");

    setAuthorization(this.request, AxiosEasyfier.BEARER_AUTHENTICATION, secret);
    return this;
  }

  /**
   * Use this method if you must handle http status code by your self.
   * Without parameter, the api will delegates all status code.
   * @param {number or array of} httpStatus
   * @returns AxiosEasyfier instance
   */
  withCustomErrorHandling(httpStatus) {
    /**
     * if have no parameters, client must handle all http errors code
     */
    if (!httpStatus) {
      if (!this.request.validateStatus) this.request.validateStatus = {};
      this.request.validateStatus = (dummy) => {
        return true;
      };
    }

    /**
     * client muste be handle a specific error code
     */
    if (!isNaN(httpStatus)) {
      if (!this.request.validateStatus) this.request.validateStatus = {};
      this.request.validateStatus = (status) => {
        return status === httpStatus || (status >= 200 && status < 300);
      };
    }

    /**
     * client muste be handle an array of errors
     */
    if (Array.isArray(httpStatus)) {
      if (!this.request.validateStatus) this.request.validateStatus = {};
      let arrayOfStatus = [];
      httpStatus.forEach((status) => {
        if (isNaN(status)) {
          throw new Error(
            `Value ${status} is not a valid http status. The status must be a number.`
          );
        }
        arrayOfStatus.push(status);
      });

      this.request.validateStatus = (status) => {
        return (
          arrayOfStatus.includes(status) || (status >= 200 && status < 300)
        );
      };
    }

    return this;
  }

  /**
   * Set http method for request
   * @param {string} method
   * @returns AxiosEasyfier instance
   */
  withMethod(method) {
    if (!method || method === "") {
      throw new Error("Http method param is required.");
    }

    this.request.method = method;
    return this;
  }

  /**
   * Set url for incomming request
   * @param {string} url
   * @returns
   */
  withUrl(url) {
    if (!url) {
      throw new Error("Url param is required.");
    } else if (url === "") {
      throw new Error("Url param is required.");
    }

    this.request.url = url;
    return this;
  }

  /**
   * Set body for incomming request
   * @param {Object} body
   * @returns AxiosEasyfier instance
   */
  withBody(body) {
    if (!body) {
      throw new Error("Body parameter is required.");
    }

    if (this.request.data) this.request.dat = {};
    this.request.data = JSON.stringify(body);
    return this;
  }

  /**
   * Set timeout in secs for request
   * @param {*} timeout
   * @returns AxiosEasyfier instance
   */
  withTimeoutInSecs(timeout) {
    if (!timeout) {
      throw new Error("Timeout parameter is required.");
    }

    if (isNaN(timeout)) throw Error("Timeout parameter must be a number");

    if (this.request.timeout) this.request.timeout = {};
    this.request.timeout = parseInt(timeout) * 1000;
    return this;
  }

  /**
   * Set timeout in milisecs for request
   * @param {*} timeout
   * @returns AxiosEasyfier instance
   */
  withTimeoutInMils(timeout) {
    if (!timeout) {
      throw new Error("Timeout parameter is required.");
    }

    if (isNaN(timeout)) throw Error("Timeout parameter must be a number");

    if (this.request.timeout) this.request.timeout = {};
    this.request.timeout = parseInt(timeout);
    return this;
  }

  /**
   * Send http request with GET method
   * @returns {Promise(resolve, reject)}
   */
  GET() {
    if (!this.request.method) this.request.method = "";
    this.request.method = AxiosEasyfier.GET_METHOD;
    return this.send();
  }

  /**
   * Send http request with POST method
   * @returns {Promise(resolve, reject)}
   */
  POST() {
    if (!this.request.method) this.request.method = "";
    this.request.method = AxiosEasyfier.POST_METHOD;
    return this.send();
  }

  /**
   * Send http request with PATCH method
   * @returns {Promise(resolve, reject)}
   */
  PATCH() {
    if (!this.request.method) this.request.method = "";
    this.request.method = AxiosEasyfier.PATCH_METHOD;
    return this.send();
  }

  /**
   * Send http request with PUT method
   * @returns {Promise(resolve, reject)}
   */
  PUT() {
    if (!this.request.method) this.request.method = "";
    this.request.method = AxiosEasyfier.PUT_METHOD;
    return this.send();
  }

  /**
   * Send http request with DELETE method
   * @returns {Promise(resolve, reject)}
   */
  DELETE() {
    if (!this.request.method) this.request.method = "";
    this.request.method = AxiosEasyfier.DELETE_METHOD;
    return this.send();
  }

  /**
   * Send request
   * @returns response data
   */
  async send() {
    return new Promise(async (resolve, reject) => {
      try {
        if (Object.keys(this.urlEncodedParams).length > 0) {
          this.request.data = qs.stringify(this.urlEncodedParams);
        }

        var response = await axios(this.request);

        if (this.request.validateStatus) {
          resolve(response);
        } else {
          resolve(response.data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * If you need more customization, or set complex parameters call,
   * use this method to get instance of request
   * @returns Request instance
   */
  getRequestInstance() {
    return this.request;
  }
}

/**
 * Aux method to set array of attributes on request object
 * @param {*} helperAttribute
 * @param {*} params
 */
const setArrayOfParams = (helperAttribute, params) => {
  if (Array.isArray(params)) {
    params.forEach((object) => {
      var attributeName = Object.keys(object)[0];
      var attributeValue = object[attributeName];
      helperAttribute[attributeName] = attributeValue;
    });
  } else {
    var attributeName = Object.keys(params)[0];
    var attributeValue = params[attributeName];
    helperAttribute[attributeName] = attributeValue;
  }
};

/**
 * Set Authorization token on header
 * @param {object} request
 * @param {string} type
 * @param {string} secret
 */
const setAuthorization = (request, type, secret) => {
  if (request.headers === undefined) request.headers = {};
  request.headers["Authorization"] = `${type} ${secret}`;
};

module.exports = AxiosEasyfier;
