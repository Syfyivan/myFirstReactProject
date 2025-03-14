import React from 'react'
import { useSelector } from 'react-redux'

const RolesPage = () => {

  //这个state是整个仓库的数据
  const rolesData = useSelector((state) => {
    return state.roles
  });
  console.log('rolesPage)-rolesData', rolesData)
  return (
    <div>RolesPage</div>
  )
}

export default RolesPage