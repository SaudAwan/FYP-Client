import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
const Rewards = React.lazy(() => import('./Rewards'))
const Sponsor = React.lazy(() => import("./sponsor/sponsors"));
const Delegate = React.lazy(() => import("./delegate/delegates"));
const Production = React.lazy(() => import("./production"));
const Operation = React.lazy(() => import("./operation"));
const Marketing = React.lazy(() => import("./marketing"));
const Task = React.lazy(() => import("./task management/task"));
const ViewTask = React.lazy(() => import("./task management/viewtask"));
const TemplateFactory = React.lazy(() => import("./template factory/templateFactory"));
const Emails = React.lazy(() => import("./marketing/emails"));

export default class AppRouter extends React.Component {
  render() {
    const { employeeDetails } = this.props;

    return (
      <Suspense fallback={<div>Loading</div>}>
        <Route path="/" exact 
        render={(props) => <Rewards {...props} employeeDetails={employeeDetails}/>}/>
        <Route path="/employee/sponsor" component={Sponsor} />

        <Route path="/employee/delegate" component={Delegate} />

        <Route
          path="/employee/production"
          render={(props) => <Production {...props} employeeDetails={employeeDetails} />}
        />

        <Route path="/employee/tasks" render={(props) => <Task {...props} userDetails={employeeDetails} />} />

        <Route
          path="/employee/task/view/:id"
          render={(props) => <ViewTask {...props} userDetails={employeeDetails} />}
        />

        <Route
          path="/employee/template-factory"
          render={(props) => <TemplateFactory {...props} userDetails={employeeDetails} />}
        />
        <Route
          path="/employee/template-factory"
          render={(props) => <TemplateFactory {...props} userDetails={employeeDetails} />}
        />
        <Route path="/employee/marketing/emails"
        render={(props) => <Emails {...props} userDetails={employeeDetails} />}/>


        {/* <Route path="/employee/marketing" component={Marketing}/>
                <Route path="/employee/operation" component={Operation}/> */}
      </Suspense>
    );
  }
}
