import { Spin } from 'antd'

function SpinLoading() {
  return (
    <Spin tip="Loading" size="large">
      <div className={'loading'} />
    </Spin>
  )
}

export default SpinLoading
