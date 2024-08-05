import Axios from "./AxiosInterceptor";
/**
 * 회원가입 API 요청 type for post
 * @param {*} props 닉네임, 이메일 JWT화한 값, password 
 * @param {*} callback 
 */
export const requestSignUp = async (props, callback) => {
  const userInfo = props;
  let value = await Axios.post('/api/pos/api/signUp', userInfo).then(req => {
    console.log('회원가입api')
    console.log(req.data)
    return req.data
  })

  callback(value);
}

export const requestSignIn = async (props, callback) => {
  const userInfo = props;
  let value
  value = await Axios.post('/api/pos/signin', userInfo).then(req => {
    console.log('로그인API 입니다')
    console.log('로그인 데이터 : ', req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestTotalSales = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessCheck/totalSales').then(req => {

    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestCodeList = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessCheck/codeList').then(req => {

    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestFrameToDeginer = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessCheck/frameToDeginer').then(req => {

    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestOrder = async (props, callback) => {
  const info = props
  let value
  value = await Axios.post('/api/pos/accessCheck/orderToOwner', info).then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestOrderList = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessCheck/orderToList').then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestOrderCancel = async (props, callback) => {
  const info = props
  let value
  value = await Axios.post('/api/pos/accessCheck/orderCancel', info).then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestPremiumState = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessCheck/premiumState').then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const reqeustReIssuePassword = async (props, callback) => {
  const info = props

  let value
  value = await Axios.post('/api/pos/accessCheck/reIssuePassword', info).then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestLogout = async (callback) => {
  let value
  value = await Axios.post('/api/pos/logout').then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestAccessLevelCheck = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessLevelCheck').then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestSideBarList = async (callback) => {
  let value
  value = await Axios.post('/api/pos/sidebarList').then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestChangeAccessToken = async (props, callback) => {
  const info = props
  let value
  value = await Axios.post('/api/pos/changeAccessToken', info).then(req => {
    console.log(req.data)
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestCreateMaster = async (props, callback) => {
  const info = props
  let value
  value = await Axios.post('/api/pos/adminCheck/createMaster', info).then(req => {

    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const reuqestShopList = async (props, callback) => {
  const info = props
  let value
  value = await Axios.post('/api/pos/adminCheck/shopList', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestSaveShop = async (props, callback) => {
  const info = props
  let value
  value = await Axios.post('/api/pos/adminCheck/saveShop', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestMakeID = async (props, callback) => {
  const info = props;
  let value
  value = await Axios.post('/api/pos/adminCheck/makeID', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestUpdateUserInfo = async (props, callback) => {
  const info = props;
  let value
  value = await Axios.post('/api/pos/adminCheck/updateUserInfo', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestDeleteUser = async (props, callback) => {
  const info = props;
  let value
  value = await Axios.post('/api/pos/adminCheck/deleteUser', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestDeleteShop = async (props, callback) => {
  const info = props;
  let value
  value = await Axios.post('/api/pos/adminCheck/deleteShop', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestsDeleteOrder = async (props, callback) => {
  const info = props;
  let value
  value = await Axios.post('/api/pos/adminCheck/deleteOrder', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestsSuccessOrder = async (props, callback) => {
  const info = props;
  let value
  value = await Axios.post('/api/pos/adminCheck/successOrder', info).then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestGoodsList = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessCheck/goodsList').then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}

export const requestBrandList = async (callback) => {
  let value
  value = await Axios.post('/api/pos/accessCheck/brandList').then(req => {
    return req.data
  }).catch(error => {
    console.log(error)
    return error
  })

  callback(value);
}