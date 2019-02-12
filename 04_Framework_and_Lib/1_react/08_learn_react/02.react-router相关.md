# react router

## 定义路由

router.js

```js
import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Home from "../pages/Home";
import List from "../pages/List";
import Detail from "../pages/Detail";
import ErrorPage from "../pages/ErrorPage";

const AppRouter = () => (
  <Router>
    <div className="App">
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Switch>
        <Route path="/home" component= {Home} />
        <Route path="/list" component={List} />
        <Route path="/detail/:id" component={Detail} />
        <Route component= {ErrorPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
```

## 访问

`Link` 自定义类型

```js
import * as React from "react";
import {Link} from "react-router-dom"

export default class ErrorPage extends React.Component {
	render() {
		return (
			<div className="errorPage">
				<p>这里是 error page</p>
				<Link to="/home">back to home</Link>
			</div>
		)
	}
}
```

## 编程式导航

`withRouter`

```js
import * as React from "react";
import { Link, withRouter } from 'react-router-dom'

class Detail extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.id)
  }
  goHome = () => {
    this.props.history.push('/home')
  }

	render() {
		return (
			<div className="detail">
				<p>这里是 Detail</p>
        <Link to="/home">goto home</Link>
        <button onClick={this.goHome}>goHome</button>
			</div>
		)
	}
}

export default withRouter(Detail)
```
