import {useRoutes} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from './actions'
import routes from './router'
import './App.css'




const mapSTP = (state) => {
  return{
    count:1
  }
}

// 旁注：不要使用mapDispathToProps，
// 只需将您的操作传递给这样的connect()函数：connect(mapStateToProps, {getNewReleases})(App); 
// 使用：this.props.getNewReleases()

const mapDTP = (dispatch) => {
  return bindActionCreators(actions,dispatch)
}



function App() {
  return useRoutes(routes)
}
export default  connect(mapSTP,{actions})(App)