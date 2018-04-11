import React from 'react'
import {Link} from 'react-router-dom'
import MUtil from 'src/util/index.jsx'
import User from 'src/service/user-service/user-service.jsx';


const _mm = new MUtil();
const _user = new User();

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: _mm.getStorage('userInfo').username || ''
        }
    }
    render() {
        return (
            <nav className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".sidebar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i>
                            {
                               this.state.userInfo ? <span>欢迎,{this.state.userInfo}</span>: <span>欢迎您</span>

                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {
                                    this.onLogout()
                                }} href="javascript:;">
                                    <i className="fa fa-sign-out fa-fw"></i> 退出登录
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
    }
    onLogout() {
        _user.logout().then(res => {
            _mm.removeStorage('userInfo')
            window.location.href = '/login'
        },errMsg => {_mm.errorTips(errMsg)})
    }
}

export default TopNav;