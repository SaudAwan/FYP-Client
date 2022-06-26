import React, { Suspense } from "react";
import { Route } from "react-router-dom";
const Rewards = React.lazy(()=> import("./rewards"));
const User = React.lazy(() => import("./user/userComponent"));
const Event = React.lazy(() => import("./event/router"));
const Team = React.lazy(() => import("./team/router"));
const Task = React.lazy(() => import("../../../employee-dashboard/js/app/task management/task"));
const ViewTask = React.lazy(() => import("../../../employee-dashboard/js/app/task management/viewtask"));
const TemplateFactory = React.lazy(() => import("../../../employee-dashboard/js/app/template factory/templateFactory"));

export default class AppRouter extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading</div>}>
        {/* <Route path="/" exact render={(props) => <Rewards {...props} CEODetails={this.props.CEODetails} />} /> */}
        <Route path="/employees" render={(props) => <User {...props} CEODetails={this.props.CEODetails} />} />
        <Route path="/events" render={(props) => <Event {...props} CEODetails={this.props.CEODetails} />} />
        <Route path="/teams" render={(props) => <Team {...props} CEODetails={this.props.CEODetails} />} />
        <Route
          path="/task-management"
          render={(props) => <Task {...props} userDetails={this.props.CEODetails} />}
        />
        <Route
          path="/task/view/:id"
          render={(props) => <ViewTask {...props} userDetails={this.props.CEODetails} />}
        />
        <Route
          path="/template-factory"
          render={(props) => <TemplateFactory {...props} userDetails={this.props.CEODetails} />}
        />
      </Suspense>
    );
  }
}
