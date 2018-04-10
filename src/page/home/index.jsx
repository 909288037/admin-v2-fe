import React from 'react'
import PageTitel from 'components/page-title/index.jsx'
import "./index.jsx"

class Home extends React.Component {

    render() {
        return (
            <div id={"page-wrapper"}>
                <PageTitel title={"首页"}>
                    <button className={"btn btn-error"}>按钮</button>
                </PageTitel>
                <div className="row">
                    <div className="col-md-12">body</div>
                </div>
            </div>
        )
    }
}
export default Home;