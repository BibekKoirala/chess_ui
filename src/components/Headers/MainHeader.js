import React from 'react'
import PostLoginHeader from './PostLoginHeader'
import PreLoginHeader from './PreLoginHeader'
import { connect } from 'react-redux'

function MainHeader(props) {

  return (
    props.user.token?<PostLoginHeader />: <PreLoginHeader />
  )
}

const mapStateToProps = (state) => ({
    user: state.User
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)