import { Spin } from 'antd'

import classes from './spin-loading.module.scss'

function SpinLoading() {
  return (
    <Spin tip="Loading" size="large">
      <div className={classes['loading']} />
    </Spin>
  )
}

export default SpinLoading
