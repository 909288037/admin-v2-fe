import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Redirect, Route, Link} from 'react-router-dom'

import Layout from 'components/layout/index.jsx';
//  页面
import Home from 'page/home/index.jsx';
//  登录页面
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import UserList from 'page/userList/index.jsx'

class App extends React.Component {


    render() {
        let layout = (
            <Layout>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route  path={"/product"} component={Home}/>
                    <Route  path={"/product-category"} component={Home}/>
                    {/*<Route  path={"/order"} component={Home}/>*/}
                    <Route  path={"/user/index"} component={UserList}/>
                    <Redirect from={"/user"} to={"/user/index"}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/"} render={(props) => (layout)}/>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>, document.getElementById("app")
)


